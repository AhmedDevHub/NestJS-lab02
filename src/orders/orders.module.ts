import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderRepository])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
