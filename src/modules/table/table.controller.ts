import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TableStatus, UserRole } from '@prisma/client';
import { Role } from 'src/common/decorators/role.decorator';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { CreateTableDto } from './dto/create.table.dto';
import { UpdateTableDto } from './dto/update.table.dto';
import { TableService } from './table.service';

@ApiTags('Tables')
@Controller('tables')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @ApiOperation({ summary: `Get all tables by branch ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER},` })
    @Get('branch/:branchId')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER)
    getAllTables(@Param('branchId', ParseIntPipe) branchId: number) {
        return this.tableService.getAllTables(branchId);
    }

    @ApiOperation({ summary: ` ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER},${UserRole.WAITER}` })
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER)
    getOneTable(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.getOneTable(id);
    }

    @ApiOperation({ summary: `Create new table - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Post()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    createTable(@Body() dto: CreateTableDto) {
        return this.tableService.createTable(dto);
    }

    @ApiOperation({ summary: `Update table details - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateTable(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Omit<UpdateTableDto, 'branchId'>,
    ) {
        return this.tableService.UpdateTable(id, dto);
    }

    @ApiOperation({ summary: ` ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}, ${UserRole.CASHIER},${UserRole.WAITER}` })
    @Patch(':id/status')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.CASHIER, UserRole.WAITER)
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: TableStatus,
    ) {
        return this.tableService.updateStatus(id, status);
    }

    @ApiOperation({ summary: `Delete table - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    deleteTable(@Param('id', ParseIntPipe) id: number) {
        return this.tableService.deleteTable(id);
    }
}