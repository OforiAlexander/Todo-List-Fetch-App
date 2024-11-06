import Todo from '../models/Todo.js';

class TodoController {
    /**
     * Retrieves all todo items from the database.
     * 
     * @param {Object} req - The request object containing parameters.
     * @param {Object} res - The response object for sending responses.
     */
    static async getTodos(req, res) {
        try {
            // Retrieve all todo items from the database
            const todos = await Todo.findAll();

            // Return the retrieved todos as a success response
            return res.status(200).json({
                success: true,
                data: todos
            });
        } catch (error) {
            // Log any errors for debugging
            console.error('Error in getTodos:', error);
            // Return an error response with details
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve todos',
                error: error.message
            });
        }
    }

    /**
     * Updates a todo item based on the provided ID and updated data.
     * 
     * @param {Object} req - The request object containing parameters and updated data.
     * @param {Object} res - The response object for sending responses.
     */
    static async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { completed } = req.body;

            const todo = await Todo.findByPk(id);
            if (!todo) { // Check if the todo item does not exist
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

            // Update the todo item with the new completed status
            todo.completed = completed;
            await todo.save();

            return res.status(200).json({
                success: true,
                message: 'Todo updated successfully',
                data: todo
            });
        } catch (error) {
            console.error('Error in updateTodo:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update todo',
                error: error.message
            });
        }
    }


    /**
     * Deletes a todo item based on the provided ID.
     * 
     * @param {Object} req - The request object containing parameters.
     * @param {Object} res - The response object for sending responses.
     */
    static async deleteTodo(req, res) {
        try {
            const { id } = req.params; // Extract the ID from request parameters
            const result = await Todo.destroy({ where: { id } }); // Attempt to delete the todo item
    
            if (result === 0) { // Check if no todo was deleted
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }
    
            return res.status(204).send(); // Successfully deleted, send no content status
        } catch (error) {
            console.error('Error in deleteTodo:', error); // Log the error for debugging
            return res.status(500).json({
                success: false,
                message: 'Failed to delete todo',
                error: error.message
            });
        }
    }
}

export default TodoController;