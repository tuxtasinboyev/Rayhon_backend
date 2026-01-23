import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaModule } from 'src/common/database/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule,ConfigModule],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
