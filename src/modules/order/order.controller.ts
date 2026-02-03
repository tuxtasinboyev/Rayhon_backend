import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create.order.dto';
import { UpdateOrderDto } from './dto/update.order.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders returned.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order returned successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'Order successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.service.update(+id, dto);
  }

  @Delete('deleted/:id')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
