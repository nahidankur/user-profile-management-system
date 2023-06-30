# Profile Management System

# Author

## Nahid Karim Ankur

Profile Management System is a MERN APPLICATION built with NodeJs, Express.js, MongoDB, ReactJs, CSS and Bootstrap that allows authenticated users to create, read, update and delete profile. It provides functionalities such as user registration, login, authentication using JWT, and the ability for users to add profiles to the database.

## Features

- User registration: Users can create an account by providing their email and password.
- User login: Registered users can log in using their email and password to obtain a JSON Web Token (JWT) for authentication.
- Authentication: The API uses stateless authentication with JWT. The JWT is sent via a cookie and must be included in the request headers for authorized access.

## Prerequisites

- Node.js and npm installed on your machine

# Installation Guide

### Install the dependencies (Backend)

```bash
npm install
```

### Install Frontend dependencies

```bash
cd frontend
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd frontend
npm run build
```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following environment variables:

     ```
        PORT=5000
        MONGO_URL= mongodb+srv://ankur:ankur@cluster0.5lt1r.mongodb.net/profilemanagement?retryWrites=true&w=majority
        JWT_SECRET= abc123
        NODE_ENV = dev 
     ```

 Or you can alternately just rename the `env.md` file attached to the code to `.env` and put it to the root folder.

4. Start backend and frontend together:

```
npm run dev
```

The server will start running on `http://localhost:3000`.

## API Endpoints

- `POST /api/register` - Register a new user.
- `POST /api/login` - Log in and obtain a JWT token.
- `GET /api/profile` - Get the list of profiles (accessible to authenticated general users).
- `GET /api/profile/:id` - Get the details of a specific profile.
- `POST /api/profile` - Add a new profile.

## License

MIT

---
