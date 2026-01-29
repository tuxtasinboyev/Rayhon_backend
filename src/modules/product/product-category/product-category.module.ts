import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/database/prisma.module';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [PrismaModule],
  providers: [ProductCategoryService],
  controllers: [ProductCategoryController]
})
export class ProductCategoryModule { }
