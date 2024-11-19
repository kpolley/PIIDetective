import { NextRequest, NextResponse } from "next/server";
import { Column } from "@prisma/client";
import { Prisma } from "@/lib/utils";
import { DataPlatform } from "@/dataplatforms/DataPlatform";
import config from "@/lib/config";

const PRISMA = Prisma.getClient();
const DATA_PLATFORM: DataPlatform = DataPlatform.getInstance();
export interface DecisionAPIBody {
  columnId: number;
  decision: "accept" | "reject";
}

export async function POST(req: NextRequest) {
  try {
    const { columnId, decision }: DecisionAPIBody = await req.json();

    if (!columnId || !decision) {
      return new NextResponse(
        JSON.stringify({ error: "Column ID and decision is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // ensure decision is either "accept" or "reject"
    if (decision !== "accept" && decision !== "reject") {
      return new NextResponse(
        JSON.stringify({
          error: 'Decision must be either "accept" or "reject"',
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // get column from db
    const column: Column = await PRISMA.column.findFirstOrThrow({
      where: {
        id: Number(columnId),
      },
    });

    DATA_PLATFORM.applyPolicyTag(
      column.datasetId,
      column.tableName,
      column.name,
      config.PII_POLICY_TAG_ID,
    );

    // save the decision to db
    await PRISMA.policyTagDecision.create({
      data: {
        columnId: column.id,
        decision: decision === "accept",
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Policy tag applied", columnId }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
