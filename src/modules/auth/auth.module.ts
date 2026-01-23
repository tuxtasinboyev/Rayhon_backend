import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModules } from 'src/common/config/jwt/jwt.module';

@Module({
    imports: [JwtModules],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
