import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [CommonModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
