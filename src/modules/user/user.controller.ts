import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { UserService } from './user.service';
import { GetAllUsersDto } from './dto/get.all.users.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { Role } from 'src/common/decorators/role.decorator';
import { UserData } from 'src/common/decorators/auth.decorators';
import type { JwtPayload } from 'src/common/config/jwt/jwt.service';

@Controller('users')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    getProfile(@UserData() user: JwtPayload) {
        return this.userService.getProfile(user);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN} ,${UserRole.CASHIER}` })
    @Get('waiters')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.CASHIER)
    getWaiters(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRole(UserRole.WAITER, q, u);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get('chefs')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    getChefs(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRole(UserRole.CHEF, q, u);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get('cashiers')
    @Role( UserRole.SUPERADMIN)
    getCashiers(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRole(UserRole.CASHIER, q, u);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}` })
    @Get('admin')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    getAdmins(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRole(UserRole.ADMIN, q, u);
    }
    
    @ApiOperation({ summary: `${UserRole.SUPERADMIN}` })
    @Get('admin--arxive')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    getAdminsArxive(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRoleArxive(UserRole.ADMIN, q, u);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get('cashiers--arxive')
    @Role(UserRole.SUPERADMIN)
    getCashiersArxive(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRoleArxive(UserRole.CASHIER, q, u);
    }


    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get('chefs--arxive')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    getChefsArxive(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRoleArxive(UserRole.CHEF, q, u);
    }


    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN} ,${UserRole.CASHIER}` })
    @Get('waiters-arxive')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.CASHIER)
    getWaitersArxive(@Query() q: GetAllUsersDto, @UserData() u: JwtPayload) {
        return this.userService.getAllUsersByRole(UserRole.WAITER, q, u);
    }



    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Post(':role')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    createUser(
        @Param('role') role: UserRole,
        @Body() dto: CreateUserDto,
        @UserData() user: JwtPayload,
    ) {
        return this.userService.createUser(dto, role, user);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch('status/:id')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Foydalanuvchi statusini oʻzgartirish (ACTIVE/BLOCKED)' })
    updateStatus(@Param('id', ParseIntPipe) id: number) {
        return this.userService.updateStatusTooggle(id);
    }

    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        return this.userService.updateUser(id, dto);
    }


    @ApiOperation({ summary: `${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Delete(':id')
    @Role(UserRole.ADMIN, UserRole.SUPERADMIN)
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
