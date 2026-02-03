import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiPropertyOptional({ description: 'Quantity of the product', minimum: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @ApiPropertyOptional({ description: 'Price of the product', minimum: 0.01 })
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({ description: 'Optional note for the order item' })
  @IsOptional()
  @IsString()
  note?: string;
}
