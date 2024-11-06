import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingTodoId, setUpdatingTodoId] = useState(null);
    const [deletingTodoId, setDeletingTodoId] = useState(null);

    const API_URL = 'http://localhost:5000';

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`${API_URL}/todos`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Add if using cookies
            });

            setTodos(response.data.data || []);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const deleteTodo = async (id) => {
        try {
            setDeletingTodoId(id);
            await axios.delete(`${API_URL}/todos/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setDeletingTodoId(null);
        }
    };

    const toggleComplete = async (id, isComplete) => {
        try {
            setUpdatingTodoId(id);
            await axios.patch(`${API_URL}/todos/${id}`, { completed: !isComplete }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setUpdatingTodoId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-6 bg-black text-white p-4 rounded-md bg-opacity-75 sticky top-2">
                <h1 className="text-2xl font-bold">Todo List</h1>
            </div>
            <div className="container mx-auto p-4">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h2 className="font-bold mb-2">Error:</h2>
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todos.map((todo) => (
                        <div key={todo.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                            <div className="flex-1">
                                <h2 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                    {todo.title}
                                </h2>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleComplete(todo.id, todo.completed)}
                                    className={`px-2 py-1 rounded ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                                    disabled={updatingTodoId === todo.id}
                                >
                                    {updatingTodoId === todo.id ? 'Updating...' : (todo.completed ? 'Undo' : 'Complete')}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    disabled={deletingTodoId === todo.id}
                                >
                                    {deletingTodoId === todo.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;