# UBER Backend API

## Overview

A Node.js/Express.js backend service for the UBER application, implementing user authentication and management functionality with MongoDB integration.

## Architecture

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod schema validation
- **CORS**: Cross-Origin Resource Sharing enabled

### Project Structure
```
Backend/
├── app.js                 # Express application setup and middleware configuration
├── server.js              # HTTP server initialization and port binding
├── package.json           # Dependencies and project metadata
├── controller/
│   └── user.controller.js # User request handlers (controllers)
├── db/
│   └── db.js             # Database connection configuration
├── models/
│   └── user.models.js    # User data model and schema definitions
├── routes/
│   └── user.routes.js    # API route definitions and request validation
└── services/
    └── user.service.js   # Business logic and data operations
```

## Features

### User Management
- **User Registration**: Complete user registration with validation
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Token-based authentication system
- **Input Validation**: Comprehensive schema validation using Zod

## API Endpoints

### Authentication Routes

#### POST `/user/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Validation Rules:**
- `email`: Valid email format (required)
- `password`: Minimum 8 characters (required)
- `firstName`: Minimum 3 characters (required)
- `lastName`: Minimum 3 characters (optional)

**Success Response (201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

**Error Responses:**
- `400`: Validation errors
- `500`: Internal server error

#### POST `/user/login`
Authenticate and login an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**
- `email`: Valid email format (required)
- `password`: Minimum 8 characters (required)

**Success Response (200):**
```json
{
  "message": "User logged in successfully!",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

**Error Responses:**
- `400`: Invalid input data or validation errors
- `401`: Invalid email or password
- `500`: Internal server error

**Authentication Flow:**
1. Validates email and password format using Zod schema
2. Queries database for user by email (includes password field)
3. Compares provided password with stored hash using bcrypt
4. Generates JWT token upon successful authentication
5. Returns user data and authentication token

## Database Schema

### User Model
```javascript
{
  fullName: {
    firstName: String (required, min: 3 chars),
    lastName: String (optional, min: 3 chars)
  },
  email: String (required, min: 5 chars),
  password: String (required, hashed, not selected by default),
  socketId: String (optional, for real-time features)
}
```

### Schema Methods
- `generateAuthToken()`: Creates JWT token for user authentication
- `comparePassword(password)`: Compares plain text password with hashed password
- `hashPassword(password)`: Static method to hash passwords before storage

## Environment Variables

Required environment variables in `.env` file:

```env
DB_CONNECT=mongodb://localhost:27017/uber_db
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the Backend directory with required variables.

3. **Database Setup:**
   Ensure MongoDB is running and accessible via the DB_CONNECT URL.

4. **Start Server:**
   ```bash
   node server.js
   ```
   Server will run on `http://localhost:3000` (or specified PORT).

## Dependencies

### Production Dependencies
- `express@^5.1.0` - Web application framework
- `mongoose@^8.18.0` - MongoDB object modeling
- `bcrypt@^6.0.0` - Password hashing library
- `jsonwebtoken@^9.0.2` - JWT implementation
- `cors@^2.8.5` - Cross-origin resource sharing
- `dotenv@^17.2.1` - Environment variable management
- `zod@^4.1.5` - Schema validation library

### Development Dependencies
- `nodemon@^3.1.10` - Development server with auto-restart

## Security Features

1. **Password Security**
   - bcrypt hashing with 10 salt rounds
   - Passwords excluded from query results by default

2. **JWT Authentication**
   - Token-based authentication
   - Secure token generation with user ID payload

3. **Input Validation**
   - Comprehensive Zod schema validation
   - Email format validation
   - Password strength requirements
   - Name length constraints

4. **CORS Protection**
   - Cross-origin request handling
   - Configurable CORS policies

## Code Quality & Patterns

### Architecture Pattern
- **MVC (Model-View-Controller)**: Clear separation of concerns
- **Service Layer**: Business logic abstraction
- **Repository Pattern**: Data access layer through Mongoose models

### Error Handling
- Centralized error handling in routes
- Descriptive error messages
- Proper HTTP status codes
- Input validation error reporting

### Code Organization
- Modular file structure
- Single responsibility principle
- Clear naming conventions
- Consistent async/await usage

## Future Enhancements

### Planned Features
- User login functionality
- Password reset mechanism
- Email verification
- Profile management
- Role-based access control

### Infrastructure Improvements
- Request logging middleware
- Rate limiting
- API documentation with Swagger
- Unit and integration tests
- Docker containerization

## Development Guidelines

### Coding Standards
- Use async/await for asynchronous operations
- Implement proper error handling
- Follow REST API conventions
- Validate all input data
- Use environment variables for configuration

### Database Best Practices
- Index frequently queried fields
- Use proper data types and constraints
- Implement data validation at schema level
- Handle connection errors gracefully

---

**Version**: 1.0.0  
**Last Updated**: September 2, 2025  
**Maintainer**: Backend Development Team
