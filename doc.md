
# Fullstack React App: Data Fetching, Updating, and Deleting Guide

This documentation explains the approach used in our fullstack React application to fetch, update, and delete data from a database. The backend is powered by an Express.js server, while the React frontend communicates with it to perform CRUD operations on the data.

## Overview of Data Operations

Our app performs the following data operations with asynchronous functions in React:
- **Fetch**: Retrieve data from the database to display in the UI.
- **Update**: Modify specific fields of existing records.
- **Delete**: Remove specific records from the database.

Each of these operations includes loading and error handling to ensure smooth user experience.

### 1. Fetching Data (GET)

To fetch data, the app uses an asynchronous `fetchTodos` function, which makes a `GET` request to the backend API using `axios`:
- **Functionality**: `fetchTodos` retrieves data from the database and parses it into JSON format.
- **Loading and Error States**: The app tracks loading state and displays a loading indicator when data is being fetched. If an error occurs, it is captured and displayed to inform the user.

Example:
```javascript
const fetchTodos = async () => {
    try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data.data || []);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
```

### 2. Updating Data (PATCH)

To update data, the app uses the `toggleComplete` function, which sends a `PATCH` request to modify a specific field (e.g., completion status) of a record:
- **Functionality**: `toggleComplete` updates the "completed" status of a todo item in the database.
- **Loading State**: During each update request, the app tracks which specific task is being updated and displays an "Updating..." indicator only on that item.

Example:
```javascript
const toggleComplete = async (id, isComplete) => {
    try {
        setUpdatingTodoId(id);  // Show loading only for this item
        await axios.patch(`${API_URL}/todos/${id}`, { completed: !isComplete });
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    } catch (error) {
        setError(error.message);
    } finally {
        setUpdatingTodoId(null);  // Reset loading state for this item
    }
};
```

### 3. Deleting Data (DELETE)

To delete data, the app uses the `deleteTodo` function, which makes a `DELETE` request to remove a specific record from the database:
- **Functionality**: `deleteTodo` deletes the specified todo item from the database.
- **Loading State**: The app tracks which specific task is being deleted and displays a "Deleting..." indicator only on that item.

Example:
```javascript
const deleteTodo = async (id) => {
    try {
        setDeletingTodoId(id);  // Show loading only for this item
        await axios.delete(`${API_URL}/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
        setError(error.message);
    } finally {
        setDeletingTodoId(null);  // Reset loading state for this item
    }
};
```

## Explanation of Loading States

Our React approach to loading states ensures that the UI remains responsive and clear:
1. **Global Loading (`loading`)**: Used when fetching data initially to load the full todo list.
2. **Updating Loading (`updatingTodoId`)**: Specific to individual todo items being updated. Only the updated item shows an "Updating..." state.
3. **Deleting Loading (`deletingTodoId`)**: Specific to individual todo items being deleted. Only the deleted item shows a "Deleting..." state.

By tracking loading states at different levels, the app provides user feedback without blocking other interactions.

---

This document provides an overview of the app's loading management and axios-based data operations, ensuring an efficient and user-friendly CRUD experience.
