-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SetItem" ALTER COLUMN "status" DROP NOT NULL;
