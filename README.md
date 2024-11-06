
# Fetching Github User Profiles From Github User API


## Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-user-viewer.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd github-user-viewer/backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=github_users_db
   GITHUB_API_URL=https://api.github.com/users
   ```

5. Set up the PostgreSQL database:
   - Create a new database named `github_users_db`.
   - Ensure the database connection details in the `.env` file match your local PostgreSQL setup.

6. Run the database migrations:
   ```bash
   npm run migrate
   ```

7. (Optional) Seed the database with initial data:
   ```bash
   npm run seed
   ```

8. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start running on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start running at `http://localhost:5173`.

## Project Structure

### Backend

The backend follows the Model-View-Controller (MVC) architecture and uses the Sequelize ORM for interacting with the PostgreSQL database.

```
backend/
├── config/
│   └── database.js
├── controllers/
│   └── UserController.js
├── migrations/
│   └── create-users-table.js
├── models/
│   └── User.js
├── routes/
│   └── web.js
├── seeders/
│   └── user-seeder.js
├── middleware/
│   └── validators.js
├── index.js
└── package.json
```

### Frontend

The frontend is built using React and utilizes the Tailwind CSS library for styling.

```
frontend/
├── src/
│   ├── components/
│   │   └── UserList.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Environment Variables

The backend project uses the following environment variables:

- `PORT`: The port number for the backend server (default is `3000`).
- `NODE_ENV`: The environment mode (e.g., `development`, `production`).
- `DB_HOST`: The host address for the PostgreSQL database.
- `DB_PORT`: The port number for the PostgreSQL database.
- `DB_USER`: The username for the PostgreSQL database.
- `DB_PASSWORD`: The password for the PostgreSQL database.
- `DB_NAME`: The name of the PostgreSQL database.
- `GITHUB_API_URL`: The base URL for the GitHub API.

## Seeding the Database

The backend project includes a seeder script that can be used to populate the `users` table with initial data. To run the seeder, execute the following command:

```bash
npm run seed
```

This will fetch a set of GitHub users from the GitHub API and store them in the PostgreSQL database.

## API Endpoints

The backend project provides the following API endpoints:

1. `POST /api/users`: Fetches and stores GitHub user data in the database.
2. `GET /api/users`: Retrieves all the stored GitHub user data from the database.

## License

This project is licensed under the [MIT License](LICENSE).
```

This README.md file provides a comprehensive overview of the project, including prerequisites, installation instructions for both the backend and frontend, the project structure, environment variables, seeding the database, API endpoints, and the project's license. Feel free to customize this README to fit your specific project requirements.