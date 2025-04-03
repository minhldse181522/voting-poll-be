/*
  Warnings:

  - You are about to drop the column `performance_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `vote` on the `performance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_performance_id_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "performance_id",
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "performance" DROP COLUMN "vote",
ADD COLUMN     "bg_desktop" VARCHAR(200),
ADD COLUMN     "bg_phone" VARCHAR(200);

-- CreateTable
CREATE TABLE "performance_category" (
    "performance_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    "vote" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "performance_category_pkey" PRIMARY KEY ("performance_id","category_id")
);

-- AddForeignKey
ALTER TABLE "performance_category" ADD CONSTRAINT "performance_category_performance_id_fkey" FOREIGN KEY ("performance_id") REFERENCES "performance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performance_category" ADD CONSTRAINT "performance_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
