import express from 'express';
import TodoController from '../controllers/TodoController.js';
import validate from '../validate.js';

const router = express.Router();

// Route to get all todos
router.get('/todos', validate.validateGetTodos, TodoController.getTodos);

// Route to update a todo's completion status
router.patch('/todos/:id', validate.validateUpdateTodo, TodoController.updateTodo);

// Route to delete a todo
router.delete('/todos/:id', validate.validateDeleteTodo, TodoController.deleteTodo);

export default router;
