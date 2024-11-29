import { NextRequest, NextResponse } from "next/server";
import { Column } from "@prisma/client";
import { prisma } from "@/lib/utils";
import { DataPlatform } from "@/dataplatforms/DataPlatform";

export interface DecisionAPIBody {
  columnId: number;
  decision: "accept" | "reject";
}

export async function POST(req: NextRequest) {
  const DATA_PLATFORM: DataPlatform = DataPlatform.getInstance();

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
    const column: Column = await prisma.column.findFirstOrThrow({
      where: {
        id: Number(columnId),
      },
    });

    if(decision === "accept") {
      await DATA_PLATFORM.applyPolicyTag(
        column.datasetId,
        column.tableName,
        column.name,
        process.env.PII_POLICY_TAG_ID!,
      );
    }

    // save the decision to db
    await prisma.policyTagDecision.create({
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
