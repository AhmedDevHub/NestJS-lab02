import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async find(filter: any = {}): Promise<OrderDocument[]> {
    return this.orderModel.find(filter).exec();
  }

  async findOne(filter: any): Promise<OrderDocument | null> {
    return this.orderModel.findOne(filter).exec();
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }

  async create(createOrderDto: any): Promise<OrderDocument> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async save(order: OrderDocument): Promise<OrderDocument> {
    return order.save();
  }

  async findByIdAndUpdate(id: string, updateData: any): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async findByIdAndDelete(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async deleteById(id: string): Promise<{ deletedCount: number }> {
    return this.orderModel.deleteOne({ _id: id }).exec();
  }
}
