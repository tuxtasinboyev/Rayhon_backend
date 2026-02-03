import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentDto {
  @ApiPropertyOptional({ description: 'Payment amount', minimum: 0.01 })
  @IsOptional()
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Status of payment',
    enum: PaymentStatus,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
