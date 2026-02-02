import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { GuardModule } from './guard/guard.module';
import { RoleGuardModule } from './role_guard/role_guard.module';
import { CoreModule } from './core/core.module';
import { ConfigModules } from './config/config.module';
import { SeaderModule } from './seeders/seader.module';

@Module({
  imports: [
    PrismaModule,
    GuardModule,
    RoleGuardModule,
    CoreModule,
    ConfigModules,
    SeaderModule,
  ],
  providers: [],
  controllers: [],
})
export class CommonModule {}
