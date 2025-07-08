import { PaymentMethod } from './order.entity';
import { v4 as uuid } from 'uuid';

// Sample order data for learning and testing purposes
const orders = [
  {
    id: uuid(), // Unique order ID
    amount: 1230.5, // Order amount
    longitude: 23.21, // Longitude of order location
    latitude: 31.01, // Latitude of order location
    clientId: 1, // Client ID
    paymentMethod: PaymentMethod.Cash, // Payment method
  },
  {
    id: uuid(),
    amount: 500.0,
    longitude: 24.12,
    latitude: 32.11,
    clientId: 2,
    paymentMethod: PaymentMethod.Visa,
  },
  {
    id: uuid(),
    amount: 750.25,
    longitude: 25.33,
    latitude: 33.22,
    clientId: 1,
    paymentMethod: PaymentMethod.Cash,
  },
];

export default orders;
