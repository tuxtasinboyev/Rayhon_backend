import { Module } from '@nestjs/common';
import { SetItemService } from './set-item.service';
import { SetItemController } from './set-item.controller';

@Module({
  providers: [SetItemService],
  controllers: [SetItemController]
})
export class SetItemModule {}
