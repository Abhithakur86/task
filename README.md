# Category & Services API

A RESTful API for managing categories and services with JWT-based authentication.

## Features

- JWT token-based authentication
- CRUD operations for categories
- CRUD operations for services within categories
- Multiple price options per service
- Input validation
- MySQL database with Sequelize ORM

## Admin Credentials

- Email: admin@codesfortomorrow.com
- Password: Admin123!@#


```



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
<img width="3840" height="1080" alt="image" src="https://github.com/user-attachments/assets/19f3fb8c-389c-4579-83b3-837421a2cbc6" />
<img width="3840" height="1080" alt="image" src="https://github.com/user-attachments/assets/e55959c9-8bb0-4518-9968-3da8a8ed87f9" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/478cf4eb-1255-4a4f-81df-1ebce0b08c2f" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a72988e5-108e-44b6-866b-291e06a9ead8" />

---
