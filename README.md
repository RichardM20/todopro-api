# TodoPro Backend

A Rest API with user authentication to manage and retrieve user-specific tasks. Uses HTTP-only cookies for secure authentication.

## Features

- **User Authentication:** Register, log in, and manage user sessions securely.
- **Task Management:** Create, update, delete, and organize tasks.
- **Task Types:** Assign and manage types for each task to improve categorization and workflow.
- **RESTful API:** Clean and consistent endpoints for easy integration.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) or your preferred database

### Installation

```bash
git clone https://github.com/yourusername/todopro-backend.git
cd todopro-backend
npm install
```

### Configuration

Create a `.env` file in the root directory of the project. You can find the required environment variables by checking the project source code

Adjust the values as needed for your environment.

### Running the Server

```bash
npm run start:dev
```

## API Endpoints

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Log in and receive a JWT token
- `POST /auth/refreshMe` - Refresh the user's authentication token using a valid refresh token (HTTP-only cookie)

### Tasks

- `GET /tasks` — Retrieve all tasks for the authenticated user
- `POST /tasks` — Create a new task
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task

### Task Types

- `GET /types` — List all task types
- `POST /types` — Create a new task type

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB & Mongoose
- JWT for authentication
