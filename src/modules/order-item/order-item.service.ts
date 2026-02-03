import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderItemDto) {
    try {
      return await this.prisma.orderItem.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // UNIQUE (orderId + productId)
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Bu product ushbu order ichida allaqachon mavjud',
          );
        }

        // FK error (orderId yoki productId yo‘q)
        if (error.code === 'P2003') {
          throw new BadRequestException('Order yoki Product mavjud emas');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.orderItem.findMany({
      include: {
        product: true,
        order: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('OrderItem topilmadi');
    }

    return item;
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    try {
      return await this.prisma.orderItem.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Not found
        if (error.code === 'P2025') {
          throw new NotFoundException('OrderItem topilmadi');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.orderItem.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('OrderItem topilmadi');
        }
      }
      throw error;
    }
  }
}
