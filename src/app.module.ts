import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './modules/orders';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/techxpress'),
    OrdersModule,
  ],
})
export class AppModule {}
