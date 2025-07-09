import { PaymentMethod } from '../enums/payment-method.enum';

/**
 * Interface for filtering orders
 */
export interface IOrderFilter {
  clientId?: string;
  paymentMethod?: PaymentMethod;
} 