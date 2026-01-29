import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductCategoryModule } from './product-category/product-category.module';
import { PrismaModule } from 'src/common/database/prisma.module';

@Module({
  controllers:[ProductController],
  providers: [ProductService],
  imports: [ProductCategoryModule,PrismaModule]
})
export class ProductModule {}
