import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CreateTableDto } from './create.table.dto';
import { TableStatus } from '@prisma/client';

export class UpdateTableDto extends PartialType(CreateTableDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    number?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    capacity?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    status?: TableStatus; 

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    branchId?: number;
}