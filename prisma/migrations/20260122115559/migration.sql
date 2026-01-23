/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "phone" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_phone_key" ON "Restaurant"("phone");
