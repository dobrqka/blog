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

For a detailed list of API routes, check the documentation or inspect the code.
