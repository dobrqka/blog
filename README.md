# Blog Platform API

This project is a full-stack application that provides a platform for managing content. It includes a backend API built with Express.js and Prisma ORM, a frontend built with React, and an admin dashboard for user and content management.

## Technologies Used

- Frontend: React, React Router, Tailwind CSS
- Backend: Node.js, Express.js, Prisma ORM
- Authentication & Security: JWT (JSON Web Tokens), bcrypt, Passport.js, CORS
- Database: PostgreSQL

## Features

- User registration and authentication
- Role-based access control (Admin, User)
- Content management (CRUD operations for posts and users)
- Admin dashboard for managing users and content

## Frontend

The frontend is built with React and allows users to:

- Register and log in
- View and interact with content
- Submit and manage their own posts

## Admin Dashboard

The admin dashboard provides additional functionality for administrators:

- View all registered users
- Manage user roles (promote to admin, delete users)
- Manage posts (edit, delete)
- Moderate comments

## Backend

The backend is built with Express.js and Prisma ORM, providing a secure and efficient API for handling authentication, user management, and content operations.

## Setup

### Prerequisites

- Node.js
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dobrqka/blog.git
```

2. Install dependencies:

```bash
cd blog
npm install
```

3. Set up your .env file with your database connection string and other configuration details.

4. Run migrations with Prisma:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm start
```

## API endpoints

### Users

- `POST /api/users`: Register a new user (requires validation)
- `GET /api/users`: Get all users (authenticated users only)
- `GET /api/users/:id`: Get a user by ID
- `PUT /api/users/:id`: Update a user by ID (authenticated users only)
- `DELETE /api/users/:id`: Delete a user by ID (authenticated users only)
- `GET /api/users/:userId/comments`: Get comments by user ID
- `GET /api/users/:userId/posts`: Get posts by user ID

### Posts

- `POST /api/posts`: Create a new post (authenticated users only)
- `GET /api/posts`: Get all posts
- `GET /api/posts/:id`: Get a post by ID
- `PUT /api/posts/:id`: Update a post by ID (authenticated users only)
- `DELETE /api/posts/:id`: Delete a post by ID (authenticated users only)
- `POST /api/posts/:postId/comments`: Create a comment on a post (authenticated users only)
- `GET /api/posts/:postId/comments`: Get comments for a specific post
- `PUT /api/posts/:postId/comments/:id`: Update a comment on a post (authenticated users only)
- `DELETE /api/posts/:postId/comments/:id`: Delete a comment on a post (authenticated users only)

### Comments

- `POST /api/comments`: Create a new comment (authenticated users only)
- `GET /api/comments`: Get all comments
- `GET /api/comments/:id`: Get a comment by ID
- `PUT /api/comments/:id`: Update a comment by ID (authenticated users only)
- `DELETE /api/comments/:id`: Delete a comment by ID (authenticated users only)

### Authentication

- `POST /api/login`: User login (JWT authentication)
