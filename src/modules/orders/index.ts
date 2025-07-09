/**
 * Orders Module Exports
 * Provides clean imports for the orders module
 */

// Core module
export { OrdersModule } from './orders.module';

// Controllers
export { OrdersController } from './controllers/orders.controller';

// Services
export { OrdersService } from './services/orders.service';

// Repositories
export { OrderRepository } from './repositories/order.repository';

// Entities
export { Order, OrderDocument, OrderSchema } from './entities/order.entity';

// DTOs
export { CreateOrderDto } from './dto/create-order.dto';
export { UpdateOrderDto } from './dto/update-order.dto';

// Enums
export { PaymentMethod } from './enums/payment-method.enum';

// Interfaces
export { IOrderFilter } from './interfaces/order-filter.interface'; 