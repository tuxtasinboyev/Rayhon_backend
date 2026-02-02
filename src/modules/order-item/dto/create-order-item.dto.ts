import { IsInt, IsPositive, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'ID of the order' })
  @IsInt()
  orderId: number;

  @ApiProperty({ description: 'ID of the product' })
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Quantity of the product', minimum: 1 })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'Price of the product', minimum: 0.01 })
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ description: 'Optional note for the order item' })
  @IsOptional()
  @IsString()
  note?: string;
}
