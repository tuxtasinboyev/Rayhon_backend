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
import { BranchService } from './branch.service';
import { CreateBranch } from './dto/create.branch.dto';
import { UpdateBranch } from './dto/update.branch.dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@UseGuards(GuardService, RoleGuardService)
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @ApiOperation({ summary: `Get all branches active- ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAllBranchesActive() {
        return this.branchService.getAllBranchesActive();
    }

    @ApiOperation({ summary: `Get all branches arxive - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Get()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAllBranchesArxive() {
        return this.branchService.getAllBranchesArxive();
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

    @ApiOperation({ summary: `Update branch status toggle - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}` })
    @Patch('toggle/:id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    updateBranchStatus(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.branchService.updateBranchStatus(id,);
    }

    @ApiOperation({ summary: `Delete branch - ${UserRole.SUPERADMIN}` })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN)
    deleteBranch(@Param('id', ParseIntPipe) id: number) {
        return this.branchService.deleteBranch(id);
    }
}