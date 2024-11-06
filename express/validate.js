import { param, body } from 'express-validator';
import { validationResult } from 'express-validator';

// Validator for fetching todos (no specific validation needed as we're just retrieving all)
export const validateGetTodos = [];

// Validator for updating a todo
export const validateUpdateTodo = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Todo ID must be a positive integer'),
    body('completed')
        .isBoolean()
        .withMessage('Completed field must be a boolean value'),
    handleValidationErrors
];

// Validator for deleting a todo
export const validateDeleteTodo = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('Todo ID must be a positive integer'),
    handleValidationErrors
];

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
}

export default {
    validateGetTodos,
    validateUpdateTodo,
    validateDeleteTodo,
};