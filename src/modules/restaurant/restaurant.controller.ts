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
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create.restaurant.dto';
import { UpdateRestaurantDto } from './dto/update.restaurant.dto';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { Role } from 'src/common/decorators/role.decorator';

@ApiTags('Restaurants')
@Controller('restaurants')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @ApiOperation({ summary: `Get all restaurants active- ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Get('active')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAllRestaurants() {
        return this.restaurantService.getAllRestaurantsActive();
    }

    @ApiOperation({ summary: `Get all restaurants arxive- ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Get('arxive')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAllRestaurantsArxive() {
        return this.restaurantService.getAllRestaurantsArxive();
    }

    @ApiOperation({ summary: `Get restaurant by ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getRestaurantById(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.getRestaurantById(id);
    }

    @ApiOperation({ summary: `Get restaurants by branch - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER}` })
    @UseGuards(GuardService, RoleGuardService)
    @Get('branch/:branchId')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER)
    getByBranch(@Param('branchId', ParseIntPipe) branchId: number) {
        return this.restaurantService.getByBranch(branchId);
    }

    @ApiOperation({ summary: `Create new restaurant - ${UserRole.SUPERADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Post()
    @Role(UserRole.SUPERADMIN)
    createRestaurant(@Body() dto: CreateRestaurantDto) {
        return this.restaurantService.createRestourant(dto);
    }

    @ApiOperation({ summary: `Update restaurant - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateRestaurant(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRestaurantDto,
    ) {
        return this.restaurantService.updateRestaurant(id, dto);
    }

    @ApiOperation({ summary: `Update restaurant status - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Patch('toggle-status/:id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateRestaurantStutus(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.restaurantService.updateStatus(id);
    }

    @ApiOperation({ summary: `Delete restaurant only status false- ${UserRole.SUPERADMIN}` })
    @UseGuards(GuardService, RoleGuardService)
    @Delete(':id')
    @Role(UserRole.SUPERADMIN)
    deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.deleteRestaurant(id);
    }
}