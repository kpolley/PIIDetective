import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";
import { BigQueryPlatform } from "@/dataplatforms/BigQuery";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class Prisma {
  private static instance: PrismaClient;

  private constructor() {}

  public static getClient(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient();
    }
    return Prisma.instance;
  }
}
