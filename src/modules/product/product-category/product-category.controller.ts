import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Role } from 'src/common/decorators/role.decorator';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { ProductCategoryService } from './product-category.service';

@ApiTags('Product Categories')
@Controller('product-categories')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class ProductCategoryController {
    constructor(private readonly categoryService: ProductCategoryService) { }

    @ApiOperation({ summary: `Get all categories by restaurant ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER}, ${UserRole.WAITER}, ${UserRole.CHEF}` })
    @Get('restaurant/:restaurantId')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER, UserRole.CHEF)
    getAllCategories(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
        return this.categoryService.getAllCategories(restaurantId);
    }

    @ApiOperation({ summary: `Get category by ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER}, ${UserRole.WAITER}, ${UserRole.CHEF}` })
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER, UserRole.CHEF)
    getOneCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.getOneCategory(id);
    }

    @ApiOperation({ summary: `Create new category - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Post()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.createCategory(dto);
    }

    @ApiOperation({ summary: `Update category - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Omit<UpdateCategoryDto, 'restaurantId'>,
    ) {
        return this.categoryService.updateCategory(id, dto);
    }

    @ApiOperation({ summary: `Delete category - ${UserRole.SUPERADMIN}` })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN)
    deleteCategory(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.deleteCategory(id);
    }
}