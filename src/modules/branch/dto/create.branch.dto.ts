import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBranch {
    @ApiProperty({ example: 'Rayxon fergana' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Uzbekiston fargona ' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'restaurantId' })
    @IsNumber()
    restaurantId: number;
}