/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL DEFAULT '',
    "user" TEXT NOT NULL DEFAULT '',
    "bot" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);
