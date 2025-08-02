# NestJS CRUD API with PostgreSQL

A complete CRUD API application built with NestJS, PostgreSQL, and Docker Compose.

## Features

- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **PostgreSQL Database**: Robust relational database with TypeORM
- **Docker Compose**: Easy development and deployment setup
- **Swagger Documentation**: Interactive API documentation
- **Input Validation**: Request validation using class-validator
- **TypeScript**: Full type safety throughout the application
- **Entity Relationships**: Users and Posts with proper relationships

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Docker and Docker Compose

## Quick Start

### Option 1: Using the Setup Script (Recommended)

```bash
# Run the automated setup script
./scripts/setup.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
yarn install

# Copy environment file
cp env.example .env
```

### 2. Using Docker Compose (Recommended)

```bash
# Start the application with PostgreSQL
docker-compose up -d

# View logs
docker-compose logs -f app
```

### 3. Local Development

#### With Docker (Recommended)
```bash
# Start PostgreSQL with Docker
docker-compose up postgres -d

# Start the application
yarn start:dev
```

#### Without Docker
```bash
# Make sure you have PostgreSQL running locally on port 5432
# Then start the application
yarn start:dev
```

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Posts

- `POST /posts` - Create a new post
- `GET /posts` - Get all posts
- `GET /posts/published` - Get published posts only
- `GET /posts/author/:authorId` - Get posts by author
- `GET /posts/:id` - Get post by ID
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## API Documentation

Once the application is running, visit:
- **Swagger UI**: http://localhost:3000/api
- **API Base URL**: http://localhost:3000

## Database Schema

### Users Table
- `id` (Primary Key)
- `firstName` (VARCHAR)
- `lastName` (VARCHAR)
- `email` (VARCHAR, Unique)
- `age` (INT, Optional)
- `isActive` (BOOLEAN)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Posts Table
- `id` (Primary Key)
- `title` (VARCHAR)
- `content` (TEXT)
- `isPublished` (BOOLEAN)
- `authorId` (Foreign Key to Users)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## Example API Usage

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "isActive": true
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "isPublished": true,
    "authorId": 1
  }'
```

## Development

### Available Scripts

- `yarn start:dev` - Start in development mode with hot reload
- `yarn build` - Build the application
- `yarn start:prod` - Start in production mode
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

### Environment Variables

Copy `env.example` to `.env` and configure:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nestjs_crud
DATABASE_USER=postgres
DATABASE_PASSWORD=password

# Application Configuration
NODE_ENV=development
PORT=3000
```

## Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build

# Remove volumes (will delete database data)
docker-compose down -v
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── users/                 # Users module
│   ├── user.entity.ts     # User database entity
│   ├── users.controller.ts # Users API endpoints
│   ├── users.service.ts   # Users business logic
│   ├── users.module.ts    # Users module definition
│   └── dto/               # Data Transfer Objects
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── posts/                 # Posts module
    ├── post.entity.ts     # Post database entity
    ├── posts.controller.ts # Posts API endpoints
    ├── posts.service.ts   # Posts business logic
    ├── posts.module.ts    # Posts module definition
    └── dto/               # Data Transfer Objects
        ├── create-post.dto.ts
        └── update-post.dto.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 