# Basic-Course-buying-site-and-Authentication

This project is a simple Node.js application that demonstrates user signup and course creation functionality using Express and Mongoose. It connects to a MongoDB database and exposes endpoints that allow you to:

- **Sign up a user** via the `/signup` endpoint.
- **Create a new course** via the `/newCourses` endpoint (only if the user exists).

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
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
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
   npm install
   ```

---

## Configuration

The MongoDB connection string is currently hardcoded in `index.js`:

```javascript
mongoose.connect('mongodb+srv://Jatin:Jatin%40050208@cluster0.fwmw9.mongodb.net/')
```

- Replace this string with your own MongoDB URI if necessary.
- Make sure your MongoDB instance is accessible from your network.

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
  Registers a new user. Requires a JSON payload with `username` and `password`.

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
      "message": "User created Successfully"
    }
    ```

- **Error Responses:**

  - **Status:** 400 (if username and password are missing or if the user already exists)

  - **Status:** 404 (if there's an input error during user creation)

---

### POST `/newCourses`

- **Description:**  
  Creates a new course. This endpoint checks if the user exists before allowing a course to be created.

- **Request Example (raw JSON):**

  ```json
  {
    "username": "Jatin",
    "password": "12345678",
    "CourseName": "How to become a youtuber",
    "CoursePrice": "5999"
  }
  ```

- **Workflow:**
  - The endpoint extracts `username` and `password` from the request.
  - It then checks if a user with the given username exists.
  - If the user is not found, it returns a 400 response with a message to sign up first.
  - If found, it proceeds to create a new course with the provided `CourseName` and `CoursePrice`.

- **Success Response:**

  - **Status:** 201  
    **Body:**

    ```json
    {
      "message": "Course created Successfully!"
    }
    ```

- **Error Responses:**
  - **Status:** 400 (if the user does not exist or if there's a problem with the course creation)
  - **Status:** 500 (for other errors during the process)

---

## Running the Application

1. **Start your server:**

   ```bash
   node index.js
   ```

2. **Verify the connection:**
   - Open your browser and navigate to `http://localhost:3000/` to see the test message.
   - Use Postman or another API testing tool to test the `/signup` and `/newCourses` endpoints.

---

## Project Structure

```
.
├── index.js         // Main server file that sets up endpoints and MongoDB connection
├── User.js          // Mongoose model for User
├── Courses.js       // Mongoose model for Courses
├── package.json     // Project dependencies and scripts
└── README.md        // Project documentation
```

- **index.js:** Contains the Express server, route definitions, and MongoDB connection logic.
- **User.js:** Defines the schema and model for users.
- **Courses.js:** Defines the schema and model for courses.

---

## Troubleshooting

- **User Not Found:**  
  If you receive "Please sign up first for creating a course", ensure that the JSON payload in your request is structured correctly and that the user exists in your database.

- **Invalid JSON Format:**  
  Make sure to send a valid JSON object. If you send an array or an incorrectly structured JSON, your server may not parse the data as expected.

- **MongoDB Connection Errors:**  
  Check your MongoDB URI and network connection if the server cannot connect to the database.

---

## License

This project is open source. You can modify and distribute it as per the terms of your chosen license.

