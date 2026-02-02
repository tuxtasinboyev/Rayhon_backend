import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemService } from './order-item.service';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly service: OrderItemService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({ status: 201, description: 'Order item successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of order items returned.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order item ID' })
  @ApiResponse({
    status: 200,
    description: 'Order item returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update order item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order item ID' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, description: 'Order item successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderItemDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('deleted/:id')
  @ApiOperation({ summary: 'Delete order item by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order item ID' })
  @ApiResponse({ status: 200, description: 'Order item successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
