import { OrderDocument } from '../modules/orders/entities/order.entity';
import { PaymentMethod } from '../modules/orders/enums/payment-method.enum';
import { OrderRepository } from '../modules/orders/repositories/order.repository';
import { CreateOrderDto } from '../modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '../modules/orders/dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';

interface FindAllOrdersFilter {
  clientId?: string;
  paymentMethod?: PaymentMethod;
}

export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(filter?: FindAllOrdersFilter): Promise<OrderDocument[]> {
    const queryFilter: any = {};
    if (filter?.clientId) {
      queryFilter.clientId = filter.clientId;
    }
    if (filter?.paymentMethod) {
      queryFilter.paymentMethod = filter.paymentMethod;
    }
    return this.orderRepository.find(queryFilter);
  }

  async findOne(id: string): Promise<OrderDocument> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderRepository.create(createOrderDto);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDocument> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async updateFull(id: string, updateOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const order = await this.findOne(id);
    // Replace all updatable fields
    order.amount = updateOrderDto.amount;
    order.longitude = updateOrderDto.longitude;
    order.latitude = updateOrderDto.latitude;
    order.clientId = updateOrderDto.clientId;
    order.paymentMethod = updateOrderDto.paymentMethod;
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderRepository.deleteById(id);
    if (result.deletedCount === 0) throw new NotFoundException('Order not found');
  }
}
