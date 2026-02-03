import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    try {
      return await this.prisma.payment.create({
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // UNIQUE (orderId + type)
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Bu order uchun ushbu payment turi allaqachon mavjud',
          );
        }

        // FK error (orderId yo‘q)
        if (error.code === 'P2003') {
          throw new BadRequestException('Order mavjud emas');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: { order: true },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Payment topilmadi');
    }

    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Payment topilmadi
        if (error.code === 'P2025') {
          throw new NotFoundException('Payment topilmadi');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.payment.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Payment topilmadi');
        }
      }
      throw error;
    }
  }
}
