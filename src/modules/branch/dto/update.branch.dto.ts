import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBranch {
    @ApiProperty({ example: 'Rayxon', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'Uzbekiston toshkent',
        required: false,
    })
    @IsOptional()
    address?: UserStatus;

    @ApiProperty({ example: 'restaurantId' })
    @IsOptional()
    @IsNumber()
    restaurantId?: number;
}
