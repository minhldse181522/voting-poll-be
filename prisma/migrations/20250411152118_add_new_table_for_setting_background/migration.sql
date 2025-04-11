/*
  Warnings:

  - You are about to drop the column `bg_desktop` on the `performance` table. All the data in the column will be lost.
  - You are about to drop the column `bg_phone` on the `performance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "performance" DROP COLUMN "bg_desktop",
DROP COLUMN "bg_phone";

-- CreateTable
CREATE TABLE "system_setting" (
    "id" SERIAL NOT NULL,
    "bg_desktop" VARCHAR(200),
    "bg_phone" VARCHAR(200),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "system_setting_pkey" PRIMARY KEY ("id")
);
