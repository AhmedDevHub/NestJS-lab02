import { IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enums/payment-method.enum';

export class CreateOrderDto {
  @ApiProperty({ example: 100.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 40.7128 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: -74.006 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 'client123' })
  @IsString()
  clientId: string;

  @ApiProperty({ example: PaymentMethod.Cash, enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
