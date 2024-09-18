-- CreateTable
CREATE TABLE "op_sessions" (
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "op_sessions_sessionToken_key" ON "op_sessions"("sessionToken");

-- AddForeignKey
ALTER TABLE "op_sessions" ADD CONSTRAINT "op_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "op_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
