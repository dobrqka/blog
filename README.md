# Blog Platform API

A full-stack RESTful blog platform API built with Express.js and Prisma ORM. Supports user authentication, post management, and comment functionality with JWT authentication and bcrypt for password security.

## Technologies Used

- Express.js: Web framework for building the API.
- Prisma ORM: Database toolkit for easy and efficient database queries.
- Passport.js & JWT: Used for secure user authentication.
- bcrypt: For securely hashing user passwords.
- PostgreSQL (or another supported database): The database for storing users, posts, and comments.

## Key Features

- User authentication with JWT tokens.
- Admin privileges for managing users, posts, and comments.
- Post management: Create, update, delete, and fetch posts.
- Comment management: Add, update, delete, and fetch comments.
- Role-based access control: Only admins can manage user roles and perform certain actions.

## Future Plans

- Frontend Application: A user-facing frontend to display and interact with posts and comments.
- Admin Dashboard: A separate interface for managing users, posts, and comments.

## Setup

### Prerequisites

- Node.js
- PostgreSQL (or any other relational database supported by Prisma)

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
