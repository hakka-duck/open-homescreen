-- CreateTable
CREATE TABLE "op_homescreens" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "target" TEXT NOT NULL DEFAULT '_blank',
    "icon" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "op_homescreens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "op_users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "op_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "op_users_username_key" ON "op_users"("username");

-- AddForeignKey
ALTER TABLE "op_homescreens" ADD CONSTRAINT "op_homescreens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "op_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
