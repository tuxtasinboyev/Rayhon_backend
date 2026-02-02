import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BranchModule } from './branch/branch.module';
import { TableModule } from './table/table.module';
import { ProductModule } from './product/product.module';
import { SetItemModule } from './set-item/set-item.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RestaurantModule,
    BranchModule,
    TableModule,
    ProductModule,
    SetItemModule,
    ConfigModule,
    JwtModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    PaymentModule,
  ],
})
export class ModulesModule {}
