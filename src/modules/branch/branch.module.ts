import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { PrismaModule } from 'src/common/database/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule,ConfigModule],
  providers: [BranchService],
  controllers: [BranchController]
})
export class BranchModule {}
