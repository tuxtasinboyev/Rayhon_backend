import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create.category.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    @Transform(({ value }) => (value === '' ? undefined : value))
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => (value === '' || value === null ? undefined : Number(value)))
    restaurantId?: number;
}