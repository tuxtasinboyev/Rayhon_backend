import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsPositive } from 'class-validator'
import { Transform } from 'class-transformer'

const emptyStringToUndefined = ({ value }) =>
    value === '' ? undefined : value

export class UpdateSetItemDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Transform(emptyStringToUndefined)
    @IsInt()
    @IsPositive()
    quantity?: number

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(emptyStringToUndefined)
    @IsInt()
    @IsPositive()
    setId?: number

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(emptyStringToUndefined)
    @IsInt()
    @IsPositive()
    productId?: number
}
