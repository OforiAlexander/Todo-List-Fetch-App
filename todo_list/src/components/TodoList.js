import { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    const API_URL = 'http://localhost:5000'; // Update if API URL is different

    const fetchTodos = async (method = 'GET') => {
        try {
            setLoading(true);
            setError(null);
            setDebugInfo(null);

            const response = await fetch(`${API_URL}/todos`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Add if using cookies
            });

            const debugResponse = {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
            };

            const textData = await response.text();
            let jsonData;

            try {
                jsonData = JSON.parse(textData);
            } catch (parseError) {
                setDebugInfo({
                    ...debugResponse,
                    rawResponse: textData.slice(0, 500)
                });
                throw new Error('Invalid JSON response from server');
            }

            if (!response.ok) {
                throw new Error(jsonData.message || `Server responded with status ${response.status}`);
            }

            setTodos(jsonData.data || []);
            setDebugInfo(debugResponse);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos('GET');
    }, []);

    const deleteTodo = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setTodos(todos.filter(todo => todo.id !== id));
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async (id, isComplete) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !isComplete })
            });

            if (response.ok) {
                setTodos(todos.map(todo => 
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                ));
            } else {
                throw new Error('Failed to update todo');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
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
                        {debugInfo && (
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Debug Information:</h3>
                                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                                    {JSON.stringify(debugInfo, null, 2)}
                                </pre>
                            </div>
                        )}
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
                                >
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
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