-- CreateTable
CREATE TABLE "category" (
    "id" BIGSERIAL NOT NULL,
    "categoryName" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "performance_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36),
    "modified_at" TIMESTAMPTZ(3),
    "modified_by" VARCHAR(36),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_performance_id_fkey" FOREIGN KEY ("performance_id") REFERENCES "performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
