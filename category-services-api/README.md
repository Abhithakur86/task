# Category & Services API

A RESTful API for managing categories and services with JWT-based authentication.

## Features

- JWT token-based authentication
- CRUD operations for categories
- CRUD operations for services within categories
- Multiple price options per service
- Input validation
- MySQL database with Sequelize ORM

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create MySQL database:
   ```sql
   CREATE DATABASE category_services_db;
   ```

4. Configure environment variables in `.env` file

5. Start the server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials

### Categories
- `POST /api/category` - Create category (requires auth)
- `GET /api/categories` - Get all categories (requires auth)
- `PUT /api/category/:categoryId` - Update category (requires auth)
- `DELETE /api/category/:categoryId` - Delete empty category (requires auth)

### Services
- `POST /api/category/:categoryId/service` - Create service (requires auth)
- `GET /api/category/:categoryId/services` - Get all services (requires auth)
- `PUT /api/category/:categoryId/service/:serviceId` - Update service (requires auth)
- `DELETE /api/category/:categoryId/service/:serviceId` - Delete service (requires auth)

## Admin Credentials

- Email: admin@codesfortomorrow.com
- Password: Admin123!@#

## Database Schema

### Categories Table
- id (INT, PRIMARY KEY)
- category_name (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### Services Table
- id (INT, PRIMARY KEY)
- category_id (INT, FOREIGN KEY)
- service_name (VARCHAR)
- type (ENUM: 'Normal', 'VIP')
- created_at, updated_at (TIMESTAMP)

### Service Price Options Table
- id (INT, PRIMARY KEY)
- service_id (INT, FOREIGN KEY)
- duration (INT)
- price (DECIMAL)
- type (ENUM: 'Hourly', 'Weekly', 'Monthly')
- created_at, updated_at (TIMESTAMP)
```

## Postman Collection

Import this JSON into Postman for testing all endpoints:

```json
{
  "info": {
    "name": "Category & Services API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@codesfortomorrow.com\",\n  \"password\": \"Admin123!@#\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/auth/login",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Categories",
      "item": [
        {
          "name": "Create Category",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"categoryName\": \"Home Cleaning\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/category",
              "host": ["{{base_url}}"],
              "path": ["api", "category"]
            }
          }
        },
        {
          "name": "Get All Categories",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/api/categories",
              "host": ["{{base_url}}"],
              "path": ["api", "categories"]
            }
          }
        },
        {
          "name": "Update Category",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"categoryName\": \"Professional Cleaning Services\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Category",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Services",
      "item": [
        {
          "name": "Create Service",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"serviceName\": \"Deep Cleaning\",\n  \"type\": \"VIP\",\n  \"priceOptions\": [\n    {\n      \"duration\": 2,\n      \"price\": 50.00,\n      \"type\": \"Hourly\"\n    },\n    {\n      \"duration\": 1,\n      \"price\": 300.00,\n      \"type\": \"Weekly\"\n    },\n    {\n      \"duration\": 1,\n      \"price\": 1000.00,\n      \"type\": \"Monthly\"\n    }\n  ]\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId/service",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId", "service"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Get All Services in Category",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId/services",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId", "services"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Update Service",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"serviceName\": \"Premium Deep Cleaning\",\n  \"type\": \"VIP\",\n  \"priceOptions\": [\n    {\n      \"duration\": 3,\n      \"price\": 60.00,\n      \"type\": \"Hourly\"\n    },\n    {\n      \"duration\": 1,\n      \"price\": 350.00,\n      \"type\": \"Weekly\"\n    }\n  ]\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId/service/:serviceId",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId", "service", ":serviceId"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                },
                {
                  "key": "serviceId",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Delete Service",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/api/category/:categoryId/service/:serviceId",
              "host": ["{{base_url}}"],
              "path": ["api", "category", ":categoryId", "service", ":serviceId"],
              "variable": [
                {
                  "key": "categoryId",
                  "value": "1"
                },
                {
                  "key": "serviceId",
                  "value": "1"
                }
              ]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": "your_jwt_token_here"
    }
  ]
}
```

---

## Setup Instructions

### Step 1: Initialize Project

```bash
mkdir category-services-api
cd category-services-api
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express jsonwebtoken bcryptjs mysql2 sequelize dotenv cors express-validator
npm install --save-dev nodemon
```

### Step 3: Create Database

Connect to MySQL and run:

```sql
CREATE DATABASE category_services_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE category_services_db;
```

### Step 4: Setup Project Files

Create all the files as shown in the project structure above with their respective code.

### Step 5: Configure Environment

Create `.env` file with your database credentials:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=category_services_db
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRES_IN=24h
ADMIN_EMAIL=admin@codesfortomorrow.com
ADMIN_PASSWORD=Admin123!@#
```

### Step 6: Start Server

```bash
npm start
# or for development
npm run dev
```

The server will start on `http://localhost:3000` and automatically create the database tables.

---

## API Testing Guide

### 1. Login to Get JWT Token

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "admin@codesfortomorrow.com",
  "password": "Admin123!@#"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@codesfortomorrow.com"
  }
}
```

Copy the token and use it in all subsequent requests as: `Authorization: Bearer <token>`

### 2. Create Category

**Endpoint:** `POST /api/category`

**Headers:** `Authorization: Bearer <your_token>`

**Request:**
```json
{
  "categoryName": "Home Cleaning"
}
```

### 3. Create Service with Price Options

**Endpoint:** `POST /api/category/1/service`

**Headers:** `Authorization: Bearer <your_token>`

**Request:**
```json
{
  "serviceName": "Deep Cleaning",
  "type": "VIP",
  "priceOptions": [
    {
      "duration": 2,
      "price": 50.00,
      "type": "Hourly"
    },
    {
      "duration": 1,
      "price": 300.00,
      "type": "Weekly"
    },
    {
      "duration": 1,
      "price": 1000.00,
      "type": "Monthly"
    }
  ]
}
```

### 4. Update Service and Price Options

**Endpoint:** `PUT /api/category/1/service/1`

**Headers:** `Authorization: Bearer <your_token>`

**Request:**
```json
{
  "serviceName": "Premium Deep Cleaning",
  "type": "VIP",
  "priceOptions": [
    {
      "duration": 3,
      "price": 75.00,
      "type": "Hourly"
    }
  ]
}
```

---

## Key Features Implemented

✅ JWT token-based authentication
✅ Protected routes (all except login require valid JWT)
✅ Hardcoded admin credentials validation
✅ Complete CRUD for categories
✅ Complete CRUD for services
✅ Multiple price options per service
✅ Add/Update/Remove price options via service update API
✅ Delete only empty categories (validation)
✅ Input validation with express-validator
✅ Clean project structure with separation of concerns
✅ Transaction support for data consistency
✅ Proper error handling
✅ MySQL database with Sequelize ORM
✅ RESTful API design
✅ Postman collection for testing

## Database Relationships

- One Category → Many Services (One-to-Many)
- One Service → Many Price Options (One-to-Many)
- Cascade delete: Deleting a service removes its price options
- Protected delete: Cannot delete category with services