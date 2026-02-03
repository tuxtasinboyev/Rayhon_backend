import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    try {
      // Table band emasligini tekshirish
      const table = await this.prisma.table.findUnique({
        where: { id: dto.tableId },
      });

      if (!table) {
        throw new NotFoundException('Table topilmadi');
      }

      if (table.status === 'BUSY') {
        throw new BadRequestException('Bu table band');
      }

      const order = await this.prisma.order.create({
        data: dto,
      });

      // table status = BUSY
      await this.prisma.table.update({
        where: { id: dto.tableId },
        data: { status: 'BUSY' },
      });

      return order;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Branch, Table yoki Waiter noto‘g‘ri');
        }
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
        payments: true,
        table: true,
        waiter: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        payments: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order topilmadi');
    }

    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Order topilmadi');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Order topilmadi');
        }
      }
      throw error;
    }
  }
}
