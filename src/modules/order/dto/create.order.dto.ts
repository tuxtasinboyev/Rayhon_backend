import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Branch ID' })
  branchId: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: number;

  @ApiProperty({ description: 'Waiter ID' })
  waiterId: number;

  @ApiPropertyOptional({ description: 'Restaurant ID', required: false })
  restaurantId?: number;

  @ApiPropertyOptional({ description: 'Number of guests', required: false })
  guestsCount?: number;
}
