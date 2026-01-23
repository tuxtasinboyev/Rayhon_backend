import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
    @ApiProperty({ example: 'Rayxon', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: '+998901234567', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        example: 'Uzbekiston toshkent',
        required: false,
    })
    @IsOptional()
    address?: UserStatus;
}
