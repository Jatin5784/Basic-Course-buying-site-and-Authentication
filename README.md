# Basic-Course-buying-site-and-Authentication

This project is a Node.js application that demonstrates user authentication and course management using Express, Mongoose, and JWT. It connects to a MongoDB database and exposes endpoints that allow you to:

- **Sign up a user** via the `/signup` endpoint with JWT authentication
- **Create a new course** via the `/newCourses` endpoint (protected by JWT authentication)
- **View all courses** via the `/Courses` endpoint

The project is designed to be tested with tools like Postman using raw JSON requests.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [GET `/`](#get-)
  - [POST `/signup`](#post-signup)
  - [POST `/newCourses`](#post-newcourses)
  - [GET `/Courses`](#get-courses)
- [Authentication](#authentication)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)
- [License](#license)

---

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v12 or later recommended)
- [npm](https://www.npmjs.com/)
- A MongoDB database (local or hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install express mongoose jsonwebtoken
   ```

---

## Configuration

The MongoDB connection string is currently hardcoded in the main file:

```javascript
mongoose.connect('mongodb+srv://Jatin:Jatin%40050208@cluster0.fwmw9.mongodb.net/')
```

- Replace this string with your own MongoDB URI if necessary.
- The JWT secret key is defined as `JwtKey = "JatinMeena"`. For production, use a more secure secret.

---

## Endpoints

### GET `/`

- **Description:**  
  A simple test endpoint to confirm that your server is running.

- **Response Example:**

  ```
  Hello, Jatin! Your server is running.
  ```

---

### POST `/signup`

- **Description:**  
  Registers a new user. Requires a JSON payload with `username` and `password`. Returns a JWT token.

- **Request Example (raw JSON):**

  ```json
  {
    "username": "Jatin",
    "password": "12345678"
  }
  ```

- **Success Response:**

  - **Status:** 201  
    **Body:**

    ```json
    {
      "message": "User created Successfully",
      "token": "jwt_token_here",
      "info": "Use Bearer prefix while sending token"
    }
    ```

- **Error Responses:**

  - **Status:** 400 (if username and password are missing or if the user already exists)
  - **Status:** 404 (if there's an input error during user creation)

---

### POST `/newCourses`

- **Description:**  
  Creates a new course. This endpoint requires JWT authentication.

- **Authentication:**
  - Include the JWT token in the Authorization header with the Bearer scheme:
  ```
  Authorization: Bearer your_jwt_token
  ```

- **Request Example (raw JSON):**

  ```json
  {
    "CourseName": "How to become a youtuber",
    "CoursePrice": 5999
  }
  ```

- **Success Response:**

  - **Status:** 201  
    **Body:**

    ```json
    {
      "message": "Course created Successfully!"
    }
    ```

- **Error Responses:**
  - **Status:** 400 (if there's a problem with the course creation)
  - **Status:** 401 (if the token format is invalid)
  - **Status:** 404 (if no token is provided)

---

### GET `/Courses`

- **Description:**  
  Retrieves all available courses from the database.

- **Success Response:**

  - **Status:** 200  
    **Body:** Array of course objects
    ```json
    [
      {
        "_id": "course_id",
        "CourseName": "How to become a youtuber",
        "CoursePrice": 5999
      }
    ]
    ```

- **Error Responses:**
  - **Status:** 400 (if there's an error loading courses)

---

## Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. When a user signs up using the `/signup` endpoint, a JWT token is generated and returned.
2. For protected routes like `/newCourses`, include this token in the Authorization header:
   ```
   Authorization: Bearer your_jwt_token
   ```
3. The `verifytoken` middleware validates the token before allowing access to protected routes.

---

## Running the Application

1. **Start your server:**

   ```bash
   node app.js
   ```

2. **Verify the connection:**
   - Open your browser and navigate to `http://localhost:3000/` to see the test message.
   - Use Postman or another API testing tool to test the endpoints.

---

## Project Structure

```
.
├── app.js           // Main server file that sets up endpoints and MongoDB connection
├── User.js          // Mongoose model for User
├── Courses.js       // Mongoose model for Courses
├── package.json     // Project dependencies and scripts
└── README.md        // Project documentation
```

- **app.js:** Contains the Express server, route definitions, and MongoDB connection logic.
- **User.js:** Defines the schema and model for users.
- **Courses.js:** Defines the schema and model for courses.

---

## Troubleshooting

- **Authentication Errors:**
  - Ensure you're including the token with the correct format: `Authorization: Bearer your_token_here`
  - Check that your token is valid and hasn't expired
  - Verify that the JWT secret key matches the one used during token generation

- **MongoDB Connection Errors:**
  - Check your MongoDB URI and network connection if the server cannot connect to the database

- **Invalid JSON Format:**
  - Make sure to send valid JSON objects in your requests

---

## Security Considerations

For a production environment, consider implementing:

- Store the JWT secret key in environment variables rather than hardcoding it
- Use password hashing (e.g., bcrypt) to securely store user passwords
- Implement token expiration for JWT tokens
- Use HTTPS for all API communications
- Add rate limiting to prevent brute force attacks
- Validate and sanitize all input data

---

## License

This project is open source. You can modify and distribute it as per the terms of your chosen license.