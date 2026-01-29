import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Kategoriya nomi',
        example: 'Ichimliklar',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Kategoriya nomi kamida 2 ta belgidan iborat bo\'lishi kerak' })
    name: string;

    @ApiProperty({
        description: 'Kategoriya tegishli bo\'lgan restoran ID-si',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    restaurantId: number;
}