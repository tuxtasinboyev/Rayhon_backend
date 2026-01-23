/*
  Warnings:

  - The values [FREE] on the enum `TableStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [OWNER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `branchId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SINGLE', 'SET');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'PENDING';

-- AlterEnum
BEGIN;
CREATE TYPE "TableStatus_new" AS ENUM ('EMPTY', 'BUSY', 'RESERVED');
ALTER TABLE "public"."Table" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Table" ALTER COLUMN "status" TYPE "TableStatus_new" USING ("status"::text::"TableStatus_new");
ALTER TYPE "TableStatus" RENAME TO "TableStatus_old";
ALTER TYPE "TableStatus_new" RENAME TO "TableStatus";
DROP TYPE "public"."TableStatus_old";
ALTER TABLE "Table" ALTER COLUMN "status" SET DEFAULT 'EMPTY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPERADMIN', 'ADMIN', 'WAITER', 'CHEF', 'CASHIER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_branchId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'SINGLE';

-- AlterTable
ALTER TABLE "Table" ALTER COLUMN "status" SET DEFAULT 'EMPTY';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "branchId" SET NOT NULL;

-- CreateTable
CREATE TABLE "SetItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "setId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "SetItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetItem" ADD CONSTRAINT "SetItem_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetItem" ADD CONSTRAINT "SetItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
