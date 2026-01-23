import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty({ example: '+998908330183' })
    @IsString()
    phone: string;


    @ApiProperty({ example: 'OMADBEK007' })
    @IsString()
    @MinLength(6)
    password: string
}
