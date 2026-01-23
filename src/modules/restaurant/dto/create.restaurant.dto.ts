import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRestaurantDto {
    @ApiProperty({ example: 'Rayxon' })
    @IsString()
    name: string;

    @ApiProperty({ example: '+998901234567' })
    @IsString()
    phone: string;

    @ApiProperty({ example: 'Uzbekiston fargona ' })
    @IsString()
    address: string;
}