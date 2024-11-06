import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Todo extends Model { };

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: "Todo",
    timestamps: true,
    underscored: true,
    tableName: "todos"
});

export default Todo;
