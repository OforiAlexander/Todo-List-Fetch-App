
# Fetching Github User Profiles From Github User API


## Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/OforiAlexander/Todo-List-Fetch-App.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd todo-list-fetch-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and update the environment variables if needed:
   ```
   cp .env.example .env
   ```

5. Set up the PostgreSQL database:
   - Create a new database named `todo`.
   - Ensure the database connection details in the `.env` file match your local PostgreSQL setup.

6. Create the PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE todo;
   \c
   ```

7. Seed the database with initial data:
   ```bash
   node seeder/seed.js
   ```

8. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start running on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../todo_f
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start running at `http://localhost:3001`.
- I advice that you change the PORT env variable to 5000 is you want to use localhost:3000 for the frontend

## Project Structure

### Backend

The backend follows the Model-View-Controller (MVC) architecture and uses the Sequelize ORM for interacting with the PostgreSQL database.

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── TodoController.js
├── models/
│   └── Todo.js
├── routes/
│   └── web.js
├── seeder/
│   └── seed.js
├── index.js
├── .env.example
└── package.json
└── validate.js
```

### Frontend

The frontend is built using React and utilizes the Tailwind CSS library for styling.

```
frontend/
├── src/
│   ├── components/
│   │   └── TodoList.js
│   ├── App.js
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

This will fetch a set of GitHub users from the GitHub API and store them in the PostgreSQL database.

## API Endpoints

The backend project provides the following API endpoints:

1. `GET /todos`: Fetchs all todos from the database.
2. `PATCH /todos/:id`: Update a specified todo item by the ID and the field is completed.
2. `DELETE /todos/:id`: Delete a specified todo item by the ID completely.
