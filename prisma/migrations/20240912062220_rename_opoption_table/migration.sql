/*
  Warnings:

  - You are about to drop the `OpOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OpOption";

-- CreateTable
CREATE TABLE "op_options" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionValue" TEXT NOT NULL,
    "autoload" TEXT NOT NULL DEFAULT 'yes',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "op_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "op_options_optionName_key" ON "op_options"("optionName");

-- CreateIndex
CREATE INDEX "op_options_optionName_idx" ON "op_options"("optionName");
