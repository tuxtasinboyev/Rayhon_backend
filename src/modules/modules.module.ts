import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BranchModule } from './branch/branch.module';
import { TableModule } from './table/table.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { SetItemModule } from './set-item/set-item.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RestaurantModule,
    BranchModule,
    TableModule,
    ProductModule,
    SetItemModule,
  ],
  controllers: [ProductController],
})
export class ModulesModule {}
