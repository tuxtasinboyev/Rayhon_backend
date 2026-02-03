import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  OrderStatus,
  PaymentStatus,
  PaymentType,
  ProductType,
  TableStatus,
  UserRole,
  UserStatus,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    try {
      console.log('🌱 Seeder started...');

      const exBranch = await this.prisma.branch.findUnique({
        where: { name: 'Markaziy filial' },
      });

      const existsRestauran = await this.prisma.branch.findUnique({
        where: { name: 'Rayhon Restaurant' },
      });

      if (!exBranch && !existsRestauran) {
        /* =======================
                           1️⃣ RESTAURANT
                        ======================= */
        const restaurant = await this.prisma.restaurant.create({
          data: {
            name: 'Rayhon Restaurant',
            phone: '+998900000000',
            address: 'Toshkent shahri',
          },
        });

        /* ======================= 
                           2️⃣ BRANCH
                        ======================= */

        const branch = await this.prisma.branch.create({
          data: {
            name: 'Markaziy filial',
            address: 'Chilonzor',
            restaurantId: restaurant.id,
          },
        });

        const hashPassword = await bcrypt.hash('OMADBEK007', 10);

        const superAdmin = await this.prisma.user.upsert({
          where: { phone: '+998908330183' }, // Telefon raqami orqali qidiradi
          update: {}, // Agar bo'lsa, hech narsani o'zgartirmaydi (yoki ma'lumotlarni yangilashingiz mumkin)
          create: {
            fullname: 'Super Admin',
            phone: '+998908330183',
            role: UserRole.SUPERADMIN,
            status: UserStatus.ACTIVE,
            branchId: branch.id,
            restaurantId: restaurant.id,
            password: hashPassword,
          },
        });

        /* =======================
                           4️⃣ TABLE
                        ======================= */
        const table = await this.prisma.table.create({
          data: {
            number: 1,
            capacity: 4,
            status: TableStatus.EMPTY,
            branchId: branch.id,
          },
        });

        /* =======================
                           5️⃣ CATEGORY
                        ======================= */
        const category = await this.prisma.category.create({
          data: {
            name: 'Milliy taomlar',
            restaurantId: restaurant.id,
          },
        });

        /* =======================
                           6️⃣ PRODUCT (SINGLE)
                        ======================= */
        const osh = await this.prisma.product.create({
          data: {
            name: 'Osh',
            price: 30000,
            type: ProductType.SINGLE,
            categoryId: category.id,
            restaurantId: restaurant.id,
          },
        });

        /* =======================
                           7️⃣ PRODUCT (SET)
                        ======================= */
        const oshSet = await this.prisma.product.create({
          data: {
            name: '4 kishilik osh',
            price: 120000,
            type: ProductType.SET,
            categoryId: category.id,
            restaurantId: restaurant.id,
          },
        });

        /* =======================
                           8️⃣ SET ITEM
                        ======================= */
        await this.prisma.setItem.create({
          data: {
            setId: oshSet.id,
            productId: osh.id,
            quantity: 4,
          },
        });

        /* =======================
                           9️⃣ ORDER
                        ======================= */
        const order = await this.prisma.order.create({
          data: {
            status: OrderStatus.NEW,
            totalPrice: 120000,
            guestsCount: 4,
            branchId: branch.id,
            tableId: table.id,
            waiterId: superAdmin.id,
            restaurantId: restaurant.id,
          },
        });

        /* =======================
                           🔟 ORDER ITEM
                        ======================= */
        await this.prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: oshSet.id,
            quantity: 1,
            price: 120000,
            note: '4 kishilik set',
          },
        });

        /* =======================
                           1️⃣1️⃣ PAYMENT
                        ======================= */
        await this.prisma.payment.create({
          data: {
            orderId: order.id,
            amount: 120000,
            type: PaymentType.CASH,
            status: PaymentStatus.PAID,
          },
        });

        console.log('✅ Seeder finished successfully');

        console.table({
          Restaurant: restaurant.name,
          Branch: branch.name,
          User: superAdmin.phone,
          Table: table.number,
          Category: category.name,
          Product: osh.name,
          Set: oshSet.name,
          Order: order.id,
          Payment: 'PAID',
        });
      }
    } catch (error) {
      console.error('❌ Seeder Error:', error);
    }
  }
}
