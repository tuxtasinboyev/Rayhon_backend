import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsPositive } from 'class-validator'

export class CreateSetItemDto {
    @ApiProperty()
    @IsInt()
    @IsPositive()
    quantity: number

    @ApiProperty()
    @IsInt()
    @IsPositive()
    setId: number

    @ApiProperty()
    @IsInt()
    @IsPositive()
    productId: number
}
