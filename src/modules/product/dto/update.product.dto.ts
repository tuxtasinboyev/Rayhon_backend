import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create.product.dto';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ProductType } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' || value === null ? undefined : Number(value)))
    price?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    type?: ProductType; 

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' || value === null ? undefined : Number(value)))
    categoryId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' || value === null ? undefined : Number(value)))
    isActive?: boolean;
}