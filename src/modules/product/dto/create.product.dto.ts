import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Mahsulot nomi',
        example: 'Osh',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Mahsulot narxi',
        example: 25000.50,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Mahsulot turi (Yakka yoki Toʻplam)',
        enum: ProductType,
        default: ProductType.SINGLE,
        required: false,
    })
    @IsEnum(ProductType)
    @IsOptional()
    type?: ProductType;

    @ApiProperty({
        description: 'Kategoriya ID-si',
        example: 5,
    })
    @IsInt()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({
        description: 'Restoran ID-si',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    restaurantId: number;

    @ApiProperty({
        description: 'Mahsulot faolligi',
        default: true,
        required: false,
    })
    @IsOptional()
    isActive?: boolean;
}