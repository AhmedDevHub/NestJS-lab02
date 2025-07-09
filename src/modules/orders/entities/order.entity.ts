import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-method.enum';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: 100.5 })
  @Prop({ required: true, type: Number })
  amount: number;

  @ApiProperty({ example: 40.7128 })
  @Prop({ required: true, type: Number })
  longitude: number;

  @ApiProperty({ example: -74.006 })
  @Prop({ required: true, type: Number })
  latitude: number;

  @ApiProperty({ example: 'client123' })
  @Prop({ required: true, type: String })
  clientId: string;

  @ApiProperty({ example: PaymentMethod.Cash, enum: PaymentMethod })
  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
