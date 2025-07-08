import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, PaymentMethod } from './order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  @ApiQuery({ name: 'clientId', required: false, type: String })
  @ApiQuery({ name: 'paymentMethod', required: false, enum: PaymentMethod })
  findAll(
    @Query('clientId') clientId?: string,
    @Query('paymentMethod') paymentMethod?: PaymentMethod,
  ): Promise<Order[]> {
    return this.ordersService.findAll({ clientId, paymentMethod });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Full update order by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order updated' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateFull(id, updateOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order updated' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Order deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.ordersService.remove(id);
    return { message: 'Order deleted' };
  }
}
