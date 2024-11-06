import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkDbConnection } from "./config/db.js";
import webRouter from "./router/web.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000'], // Adjust to your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Enable if using cookies
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Test database connection and sync tables
(async () => {
    try {
        await checkDbConnection();
        const sequelize = (await import('./config/db.js')).default;
        await sequelize.sync({ alter: true }); // Sync tables, using alter in development
        console.log('Database connected and synced successfully');
    } catch (error) {
        console.error('Database connection/sync failed:', error.message);
        process.exit(1); // Exit if database connection fails
    }
})();

// Routes
app.use('/', webRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Requested route not found"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

export default app;
