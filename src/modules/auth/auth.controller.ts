import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @ApiOperation({})
    @Post('login')
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload)
    }


    @ApiOperation({})
    @Post('reset-password')
    resetPassword(@Body() payload: ResetPasswordDto) {
        return this.authService.resetPassword(payload)
    }
}
