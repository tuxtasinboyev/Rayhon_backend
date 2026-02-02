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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('Payments') // Swagger bo‘lim nomi
@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'Payment successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'List of payments returned.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiResponse({ status: 200, description: 'Payment returned successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment successfully updated.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete('deleted/:id')
  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Payment ID' })
  @ApiResponse({ status: 200, description: 'Payment successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
