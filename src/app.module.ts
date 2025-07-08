import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Change as needed
      password: 'postgres', // Change as needed
      database: 'techxpress', // Change as needed
      entities: [Order],
      synchronize: true, // Set to false in production
    }),
    OrdersModule,
  ],
})
export class AppModule {}
