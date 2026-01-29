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
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { UserRole } from '@prisma/client'
import { Role } from 'src/common/decorators/role.decorator'
import { GuardService } from 'src/common/guard/guard.service'
import { RoleGuardService } from 'src/common/role_guard/role_guard.service'
import { CreateSetItemDto } from './dto/create.setItem.dto'
import { UpdateSetItemDto } from './dto/update.setItem.dto'
import { SetItemService } from './set-item.service'

@ApiTags('Set Items')
@ApiBearerAuth()
@Controller('set-items')
@UseGuards(GuardService, RoleGuardService)
export class SetItemController {
    constructor(private readonly setItemService: SetItemService
    ) { }

 
    @ApiOperation({
        summary: `Get all set items - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`,
    })
    @Get()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getAll() {
        return this.setItemService.getAllSetItem()
    }

    @ApiOperation({
        summary: `Get one set item by ID - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`,
    })
    @Get(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.setItemService.getOneSetItem(id)
    }

    @ApiOperation({
        summary: `Create set item - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`,
    })
    @Post()
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    create(@Body() dto: CreateSetItemDto) {
        return this.setItemService.create(dto)
    }

 
    @ApiOperation({
        summary: `Update set item - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`,
    })
    @Patch(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateSetItemDto,
    ) {
        return this.setItemService.update(id, dto)
    }

 
    @ApiOperation({
        summary: `Delete set item - ${UserRole.SUPERADMIN}, ${UserRole.ADMIN}`,
    })
    @Delete(':id')
    @Role(UserRole.SUPERADMIN, UserRole.ADMIN)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.setItemService.delete(id)
    }
}
