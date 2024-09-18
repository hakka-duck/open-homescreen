-- CreateTable
CREATE TABLE "OpOption" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "optionValue" TEXT NOT NULL,
    "autoload" TEXT NOT NULL DEFAULT 'yes',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpOption_optionName_key" ON "OpOption"("optionName");

-- CreateIndex
CREATE INDEX "OpOption_optionName_idx" ON "OpOption"("optionName");
