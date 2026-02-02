import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentType } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID of the order' })
  @IsInt()
  orderId: number;

  @ApiProperty({ description: 'Payment amount', minimum: 0.01 })
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Type of payment', enum: PaymentType })
  @IsEnum(PaymentType)
  type: PaymentType;

  @ApiProperty({ description: 'Status of payment', enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
