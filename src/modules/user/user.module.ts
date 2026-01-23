import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [PrismaModule,JwtModule,ConfigModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }


