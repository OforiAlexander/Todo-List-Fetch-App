import Todo from '../models/Todo.js';

class TodoController {
    static async getTodos(req, res) {
        try {
            const todos = await Todo.findAll();
            return res.status(200).json({
                success: true,
                data: todos
            });
        } catch (error) {
            console.error('Error in getTodos:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve todos',
                error: error.message
            });
        }
    }

    static async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { completed } = req.body;

            const todo = await Todo.findByPk(id);
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

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

    static async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            const result = await Todo.destroy({ where: { id } });

            if (result === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Todo not found'
                });
            }

            return res.status(204).send();
        } catch (error) {
            console.error('Error in deleteTodo:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete todo',
                error: error.message
            });
        }
    }
}

export default TodoController;