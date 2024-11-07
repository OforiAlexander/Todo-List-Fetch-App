import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

    // Checks for db connections and error handling
    export const checkDbConnection = async () => {
        try {
            await sequelize.authenticate();
            console.log('Database connected to PostgreSQL')
            return true; //If its connected
        } catch (error) {
            console.error("Connection error, connection note made to PostgreSql: ", error.message);
            return false; //If its not connected
        }
    }

export default sequelize;