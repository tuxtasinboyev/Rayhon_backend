import { ApiProperty } from '@nestjs/swagger';
import { TableStatus } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateTableDto {
    @ApiProperty({
        description: 'Stol raqami (har bir filialda takrorlanmas bo\'lishi kerak) ',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    number: number;

    @ApiProperty({
        description: 'Stol necha kishilik ekanligi',
        example: 4,
    })
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    capacity: number;

    @ApiProperty({
        description: 'Stol holati',
        enum: TableStatus,
        default: TableStatus.EMPTY,
        required: false,
    })
    @IsEnum(TableStatus)
    @IsOptional()
    status?: TableStatus;

    @ApiProperty({
        description: 'Stol tegishli bo\'lgan filial(branch) ID- si',
        example: 2,
    })
    @IsInt()
    @IsNotEmpty()
    branchId: number;
}