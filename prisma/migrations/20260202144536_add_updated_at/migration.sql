/*
  Warnings:

  - You are about to drop the column `updateAt` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId,name]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,type]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[restaurantId,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[setId,productId]` on the table `SetItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_restaurantId_name_key" ON "Branch"("restaurantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productId_key" ON "OrderItem"("orderId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_type_key" ON "Payment"("orderId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Product_restaurantId_name_key" ON "Product"("restaurantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "SetItem_setId_productId_key" ON "SetItem"("setId", "productId");






