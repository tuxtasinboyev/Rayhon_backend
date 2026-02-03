import { OrderStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: 'Order status', enum: OrderStatus })
  status?: OrderStatus;

  @ApiPropertyOptional({ description: 'Number of guests' })
  guestsCount?: number;

  @ApiPropertyOptional({
    description: 'Order closed at date-time',
    type: String,
    format: 'date-time',
  })
  closedAt?: Date;
}
