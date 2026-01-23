import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class ResetPasswordDto {

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    oldPassword: string

    @ApiProperty()
    @IsString()
    @MinLength(6)
    newPassword: string
}
