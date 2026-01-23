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
import { BranchService } from './branch.service';
import { CreateBranch } from './dto/create.branch.dto';
import { UpdateBranch } from './dto/update.branch.dto';
import { GuardService } from 'src/common/guard/guard.service';
import { RoleGuardService } from 'src/common/role_guard/role_guard.service';
import { Role } from 'src/common/decorators/role.decorator';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @ApiOperation({ summary: `Get all branches - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAllBranches() {
        return this.branchService.getAllBranches();
    }

    @ApiOperation({ summary: `Get branch by ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getOneBranchBy(@Param('id', ParseIntPipe) id: number) {
        return this.branchService.getOneBranchBy(id);
    }

    @ApiOperation({ summary: `Get branches by restaurant ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get('restaurant/:id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getbranchByRestaurantId(@Param('id', ParseIntPipe) id: number) {
        return this.branchService.getbranchByRestaurantId(id);
    }

    @ApiOperation({ summary: `Create new branch - ${UserRole.SUPERADMIN}` })
    @Post()
    @Role(UserRole.SUPERADMIN)
    createBranch(@Body() dto: CreateBranch) {
        return this.branchService.createBranch(dto);
    }

    @ApiOperation({ summary: `Update branch - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateBranch(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateBranch,
    ) {
        return this.branchService.updateBranch(id, dto);
    }

    @ApiOperation({ summary: `Delete branch - ${UserRole.SUPERADMIN}` })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN)
    deleteBranch(@Param('id', ParseIntPipe) id: number) {
        return this.branchService.deleteBranch(id);
    }
}