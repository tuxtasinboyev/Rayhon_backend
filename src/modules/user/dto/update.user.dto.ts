import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class UpdateUserDto {
    @ApiProperty({ example: 'Ali Valiyev', required: false })
    @IsOptional()
    @IsString()
    fullname?: string;

    @ApiProperty({ example: '+998901234567', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        enum: UserStatus,
        example: UserStatus.ACTIVE,
        required: false,
    })
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}
