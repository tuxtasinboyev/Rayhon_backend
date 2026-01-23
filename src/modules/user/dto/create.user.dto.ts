import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Ali Valiyev' })
    @IsString()
    fullname: string;

    @ApiProperty({ example: '+998901234567' })
    @IsString()
    phone: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 1, description: 'Branch ID' })
    @IsInt()
    @IsNotEmpty()
    branchId: number;

    @ApiProperty({ example: 1, description: 'restaurantId ID' })
    @IsNotEmpty()
    @IsInt()
    restaurantId: number;
}