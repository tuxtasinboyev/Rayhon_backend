import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductType, UserRole } from '@prisma/client';
import { Role } from 'src/common/decorators/role.decorator';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @ApiOperation({ summary: `Get product by ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER}, ${UserRole.WAITER} , ${UserRole.CHEF}` })
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER, UserRole.CHEF)
    getOneProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getOneProduct(id);
    }


    @ApiOperation({ summary: `Get all products with filters - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER}, ${UserRole.WAITER}, ${UserRole.CHEF}` })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'categoryId', required: false, type: Number })
    @ApiQuery({ name: 'restaurantId', required: false, type: Number })
    @ApiQuery({ name: 'type', required: false, enum: ProductType })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @Get()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER, UserRole.CHEF)
    getAllProduct(
        @Query('search') search?: string,
        @Query('categoryId',new ParseIntPipe({ optional: true })) categoryId?: number,
        @Query('restaurantId',new ParseIntPipe({ optional: true })) restaurantId?: number,
        @Query('type') type?: ProductType,
        @Query('isActive', new ParseBoolPipe({ optional: true })) isActive?: boolean,
    ) {
        return this.productService.getAllProduct({ search, categoryId, restaurantId, type, isActive });
    }


    @ApiOperation({ summary: `Create new product - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Post()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @ApiOperation({ summary: `Update product details - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Omit<UpdateProductDto, 'restaurantId'>,
    ) {
        return this.productService.updateProduct(id, dto);
    }

    @ApiOperation({ summary: `Update product type - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @ApiBody({ schema: { properties: { type: { type: 'string', enum: Object.values(ProductType) } } } })
    @Patch(':id/type')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateProductType(
        @Param('id', ParseIntPipe) id: number,
        @Body('type') type: ProductType,
    ) {
        return this.productService.updateProductType(id, type);
    }

    @ApiOperation({ summary: `Toggle product status (active/inactive) - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id/toggle-status')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateProductStatusToogle(@Param('id', ParseIntPipe) id: number) {
        return this.productService.updateProductStatusToogle(id);
    }

    @ApiOperation({ summary: `Delete product - ${UserRole.SUPERADMIN}` })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN)
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}