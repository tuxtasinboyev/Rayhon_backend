import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "./redis/redis.module";
import { JwtModules } from "./jwt/jwt.module";
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [JwtModules, RedisModule, JwtModule, ConfigModule.forRoot({
        isGlobal: true, // <--- SHU QATOR HAMMA MODULLARGA ESHIKNI OCHADI
    })],
    controllers: [],
    providers: []
})
export class ConfigModules { }