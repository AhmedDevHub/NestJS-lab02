import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// Enum for allowed payment methods
export enum PaymentMethod {
  Cash = 'Cash', // Payment by cash
  Visa = 'Visa', // Payment by Visa card
}

@Entity()
export class Order {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 100.5 })
  @Column('decimal')
  amount: number;

  @ApiProperty({ example: 40.7128 })
  @Column('decimal')
  longitude: number;

  @ApiProperty({ example: -74.006 })
  @Column('decimal')
  latitude: number;

  @ApiProperty({ example: 'client123' })
  @Column()
  clientId: string;

  @ApiProperty({ example: PaymentMethod.Cash, enum: PaymentMethod })
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;
}
