-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('PersonName', 'PersonAddress', 'PersonPhoneNumber', 'SSN', 'PersonEmail', 'IPAddress');

-- CreateEnum
CREATE TYPE "ConfidenceScore" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "ScanStatusType" AS ENUM ('InProgress', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "columns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "column_classifications" (
    "id" SERIAL NOT NULL,
    "columnId" INTEGER NOT NULL,
    "classification" "Classification" NOT NULL,
    "confidenceScore" "ConfidenceScore" NOT NULL,

    CONSTRAINT "column_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy_tag_decisions" (
    "id" SERIAL NOT NULL,
    "columnId" INTEGER NOT NULL,
    "decision" BOOLEAN NOT NULL,
    "decisionTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_tag_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan_status" (
    "id" SERIAL NOT NULL,
    "status" "ScanStatusType" NOT NULL,
    "scanStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scanEnd" TIMESTAMP(3),

    CONSTRAINT "scan_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_history" (
    "id" SERIAL NOT NULL,
    "tableName" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,
    "lastScanTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "table_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "columns_name_tableName_datasetId_key" ON "columns"("name", "tableName", "datasetId");

-- CreateIndex
CREATE UNIQUE INDEX "column_classifications_columnId_key" ON "column_classifications"("columnId");

-- CreateIndex
CREATE UNIQUE INDEX "table_history_tableName_datasetId_key" ON "table_history"("tableName", "datasetId");

-- AddForeignKey
ALTER TABLE "column_classifications" ADD CONSTRAINT "column_classifications_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_tag_decisions" ADD CONSTRAINT "policy_tag_decisions_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "column_classifications"("columnId") ON DELETE CASCADE ON UPDATE CASCADE;
