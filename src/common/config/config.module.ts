import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "./redis/redis.module";
import { JwtModules } from "./jwt/jwt.module";

@Module({
    imports: [ JwtModules,RedisModule,JwtModule],
    controllers: [],
    providers: []
})
export class ConfigModule { }