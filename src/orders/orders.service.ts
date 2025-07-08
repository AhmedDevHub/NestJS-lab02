import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, PaymentMethod } from './order.entity';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

interface FindAllOrdersFilter {
  clientId?: string;
  paymentMethod?: PaymentMethod;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async findAll(filter?: FindAllOrdersFilter): Promise<Order[]> {
    const where: Partial<Order> = {};
    if (filter?.clientId) {
      where.clientId = filter.clientId;
    }
    if (filter?.paymentMethod) {
      where.paymentMethod = filter.paymentMethod;
    }
    return this.orderRepository.find({ where });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async updateFull(id: number, updateOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    // Replace all updatable fields
    order.amount = updateOrderDto.amount;
    order.longitude = updateOrderDto.longitude;
    order.latitude = updateOrderDto.latitude;
    order.clientId = updateOrderDto.clientId;
    order.paymentMethod = updateOrderDto.paymentMethod;
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Order not found');
  }
}
