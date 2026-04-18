# Task Manager API

A RESTful API for managing tasks built with Node.js, Express, and MongoDB.

## Description

Task Manager API is a backend application that provides a robust CRUD (Create, Read, Update, Delete) interface for task management. It demonstrates professional Node.js best practices including strict TypeScript, input validation with Zod, proper error handling, and MongoDB integration with Mongoose.

## Features

- RESTful API endpoints for task management
- MongoDB database integration with Mongoose ODM
- Input validation using Zod schema validation
- Route parameter validation (MongoDB ObjectId)
- Custom error handling with proper HTTP status codes
- Strict TypeScript with full type inference
- Connection pooling and timeout configurations for MongoDB
- Docker support for MongoDB
- Unit tests with Vitest

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4.x-3E67B1?style=for-the-badge&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6CBA3F?style=for-the-badge&logoColor=white)

## Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Docker and Docker Compose (for MongoDB)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api

# Install dependencies
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URL=mongodb://root:root@localhost:27017/api?authSource=admin
MONGO_DB_NAME=api
```

| Variable | Description | Default |
|----------|------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URL` | MongoDB connection string | - |
| `MONGO_DB_NAME` | Database name | `api` |

## Running the Project

### Development Mode

```bash
pnpm dev
```

The server will start at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

### Running Tests

```bash
pnpm test
```

### With Docker (MongoDB)

Start MongoDB using Docker Compose:

```bash
docker-compose up -d
```

## API Reference

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/task` | Get all tasks |
| `POST` | `/task` | Create a new task |
| `PATCH` | `/task/:id` | Update a task |
| `DELETE` | `/task/:id` | Delete a task |

### Request/Response Examples

#### Create a Task

**Request:**

```http
POST /api/v1/task
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager API",
  "priority": "high",
  "completed": false
}
```

**Response (201):**

```json
{
  "status": "success",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "priority": "high",
    "completed": false
  }
}
```

#### Get All Tasks

**Request:**

```http
GET /api/v1/task
```

**Response (200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the task manager API",
      "priority": "high",
      "completed": false
    }
  ]
}
```

#### Update a Task

**Request:**

```http
PATCH /api/v1/task/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "completed": true
}
```

#### Delete a Task

**Request:**

```http
DELETE /api/v1/task/507f1f77bcf86cd799439011
```

### Validation Errors

**Request:**

```http
POST /api/v1/task
Content-Type: application/json

{
  "title": "ab"
}
```

**Response (400):**

```json
{
  "status": "fail",
  "message": "[title] - String must contain at least 3 character(s)"
}
```

### Invalid Route Parameter

**Request:**

```http
PATCH /api/v1/task/invalid-id
```

**Response (400):**

```json
{
  "status": "fail",
  "message": "[id] - Invalid Id"
}
```

## Project Structure

```
src/
├── config/
│   └── envs.ts              # Environment configuration
├── modules/
│   └── task/
│       ├── models/
│       │   └── task-mongo.model.ts    # Mongoose model
│       ├── schemas/
│       │   └── task.schema.ts      # Zod schemas
│       ├── services/
│       │   └── task.service.ts   # Business logic
│       └── types/
│           └── task.ts           # Type definitions
├── server/
│   ├── controllers/
│   │   └── task.controller.ts   # Route handlers
│   ├── db/
│   │   └── mongodb.connection.ts  # MongoDB connection
│   ├── middlewares/
│   │   ├── error-handler.middleware.ts    # Error handling
│   │   └── schema-validator.middleware.ts # Input validation
│   └── routes/
│       ├── app.router.ts      # Main router
│       └── task.router.ts  # Task routes
├── shared/
│   └── custom-error.ts        # Custom error class
├── index.ts               # Entry point
└── server/
    └── app.ts            # Express app setup
```

## Error Handling

The API uses a custom error class (`AppError`) that provides:
- Operational errors with custom messages
- Automatic HTTP status code mapping
- Structured error responses

## License

MIT License - see LICENSE file for details.

## Author

Brian Rios - [GitHub](https://github.com/riosbrian)