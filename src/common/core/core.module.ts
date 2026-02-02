import { Global, Module } from '@nestjs/common';
import { FileStreamerController } from './services/file.stream.controller';
import { FileStreamService } from './services/file.stream.service';
import { SesionsModule } from './sesions/sesions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [SesionsModule],
  controllers: [FileStreamerController],
  providers: [FileStreamService],
})
export class CoreModule {}
