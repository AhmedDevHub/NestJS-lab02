# TechXpress Orders API - MongoDB Version

A NestJS REST API for managing orders with MongoDB integration.

## 🚀 Features

- **CRUD Operations**: Complete order management (Create, Read, Update, Delete)
- **MongoDB Integration**: Using Mongoose ODM for data persistence
- **Swagger Documentation**: Interactive API documentation at `/api`
- **Data Validation**: Input validation using class-validator
- **3-Tier Architecture**: Controller → Service → Repository pattern
- **Filtering**: Get orders by clientId and paymentMethod
- **Custom Repository**: OrderRepository for data access layer

## 📋 Requirements

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NestJS-lab02
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB**
   
   **Option 1: Local MongoDB**
   - Install MongoDB locally
   - Start MongoDB service: `mongod`
   - Database `techxpress` will be created automatically

   **Option 2: MongoDB Atlas (Cloud)**
   - Create a MongoDB Atlas account
   - Create a cluster and get connection string
   - Update connection string in `src/app.module.ts`

4. **Configure Database Connection**
   
   Update the MongoDB connection string in `src/app.module.ts`:
   ```typescript
   MongooseModule.forRoot('mongodb://localhost:27017/techxpress')
   ```

   For MongoDB Atlas:
   ```typescript
   MongooseModule.forRoot('mongodb+srv://username:password@cluster.mongodb.net/techxpress')
   ```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Build
npm run build
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Access the Swagger documentation at: `http://localhost:3000/api`

## 🔗 API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/orders` | Get all orders | - |
| GET | `/orders?clientId=123` | Get orders by client | - |
| GET | `/orders?paymentMethod=Cash` | Get orders by payment method | - |
| GET | `/orders/:id` | Get order by ID | - |
| POST | `/orders` | Create new order | CreateOrderDto |
| PUT | `/orders/:id` | Full update order | CreateOrderDto |
| PATCH | `/orders/:id` | Partial update order | UpdateOrderDto |
| DELETE | `/orders/:id` | Delete order | - |

## 📊 Data Model

### Order Entity
```typescript
{
  _id: string,           // MongoDB ObjectId
  amount: number,        // Order amount
  longitude: number,     // Location longitude
  latitude: number,      // Location latitude
  clientId: string,      // Client identifier
  paymentMethod: 'Cash' | 'Visa',  // Payment method
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

### CreateOrderDto
```typescript
{
  amount: number,
  longitude: number,
  latitude: number,
  clientId: string,
  paymentMethod: 'Cash' | 'Visa'
}
```

## 🔄 Migration from PostgreSQL

This project was successfully migrated from PostgreSQL with TypeORM to MongoDB with Mongoose:

### Key Changes Made:
1. **Database**: PostgreSQL → MongoDB
2. **ORM**: TypeORM → Mongoose
3. **Schema**: Entity decorators → Mongoose schema
4. **IDs**: Numeric IDs → MongoDB ObjectIds (strings)
5. **Repository**: TypeORM Repository → Custom Mongoose Repository
6. **Dependencies**: Removed TypeORM, added Mongoose

### Architecture Maintained:
- ✅ 3-Tier Architecture (Controller → Service → Repository)
- ✅ Custom Repository Pattern
- ✅ Data Validation with DTOs
- ✅ Swagger Documentation
- ✅ All CRUD Operations
- ✅ Filtering Capabilities
- ✅ Error Handling (404, 400, etc.)

## 🏗️ **Enhanced Architecture & Best Practices**

### **Improved Project Structure:**
- **Feature-based Module Organization**: Each feature has its own dedicated module with proper subfolder structure
- **Separation of Concerns**: Clear separation between controllers, services, repositories, DTOs, entities, and interfaces
- **Barrel Exports**: Index files for clean and organized imports
- **Common Module**: Shared utilities and components for reusability
- **Configuration Module**: Centralized configuration management

### **NestJS Best Practices Implemented:**
- **Modular Architecture**: Feature modules with clear boundaries
- **Dependency Injection**: Proper service injection and loose coupling
- **Interface Segregation**: TypeScript interfaces for better type safety
- **Single Responsibility**: Each class has a single, well-defined purpose
- **Clean Imports**: Barrel exports for cleaner import statements
- **Proper Error Handling**: Consistent error responses with appropriate HTTP status codes
- **Input Validation**: Comprehensive DTO validation with class-validator
- **Documentation**: Extensive Swagger/OpenAPI documentation

### **Application Layer Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                     HTTP Request/Response                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  Controller Layer                           │
│  • HTTP Route Handling  • Request Validation               │
│  • Response Formatting  • Swagger Documentation            │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                   Service Layer                             │
│  • Business Logic      • Data Transformation               │
│  • Error Handling      • Orchestration                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                 Repository Layer                            │
│  • Data Access Logic   • Database Operations               │
│  • Query Building      • Result Mapping                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    MongoDB Database                         │
│  • Document Storage     • Indexing                         │
│  • Transactions        • Aggregation                       │
└─────────────────────────────────────────────────────────────┘
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📁 Project Structure

```
src/
├── common/                     # Shared utilities and components
│   ├── constants/              # Application constants
│   ├── decorators/             # Custom decorators
│   ├── filters/                # Exception filters
│   ├── guards/                 # Authentication guards
│   ├── interceptors/           # Request/response interceptors
│   └── pipes/                  # Validation pipes
├── config/                     # Configuration files
│   ├── database.config.ts      # Database configuration
│   └── config.module.ts        # Configuration module
├── modules/                    # Feature modules
│   └── orders/                 # Orders feature module
│       ├── controllers/        # REST controllers
│       │   ├── orders.controller.ts
│       │   └── orders.controller.spec.ts
│       ├── dto/                # Data Transfer Objects
│       │   ├── create-order.dto.ts
│       │   ├── update-order.dto.ts
│       │   └── index.ts        # Barrel exports
│       ├── entities/           # Database schemas
│       │   ├── order.entity.ts
│       │   └── index.ts
│       ├── enums/              # Type enums
│       │   ├── payment-method.enum.ts
│       │   └── index.ts
│       ├── interfaces/         # TypeScript interfaces
│       │   ├── order-filter.interface.ts
│       │   └── index.ts
│       ├── repositories/       # Data access layer
│       │   └── order.repository.ts
│       ├── services/           # Business logic
│       │   ├── orders.service.ts
│       │   └── orders.service.spec.ts
│       ├── orders.module.ts    # Module definition
│       └── index.ts            # Module barrel exports
├── app.controller.ts           # Root controller
├── app.module.ts               # Root module
├── app.service.ts              # Root service
└── main.ts                     # Application bootstrap
```

## 🔧 Development

- **Code formatting**: `npm run format`
- **Linting**: `npm run lint`
- **Watch mode**: `npm run start:dev`

## 📝 Notes

- MongoDB ObjectIds are used instead of numeric IDs
- All TypeORM references have been removed
- Maintains all original functionality
- Swagger documentation updated for string IDs
- Error codes: 200, 201, 204, 404, 400 as specified

---

**Technology Stack**: NestJS, MongoDB, Mongoose, TypeScript, Swagger, class-validator
