import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BranchModule } from './branch/branch.module';

@Module({
    imports: [AuthModule, UserModule, RestaurantModule, BranchModule]
})
export class ModulesModule { }
