
# Fullstack React Todo: Data Fetching, Updating, and Deleting Approach


The app performs the following data operations with asynchronous functions in React:

- **Fetch**: Retrieve data from the database to display in the frontend.
- **Update**: Mark specified field as completed.
- **Delete**: Remove specific records from the database completely.

Each of these operations includes loading and error handling to ensure smooth user experience.

### 1. Fetching Data (GET)

To fetch data, the app uses an asynchronous `fetchTodos` function, which makes a `GET` request to the backend express API using `axios`:
- `fetchTodos` fetches data from the database and parses it into JSON format. This format is what the app uses.
- **Loading States** The todo frontend monitors loading state and displays a loading indicator when data is being fetched. If an error occurs, it is captured and displayed to inform the user. This is to assist the user with debugging and leveling down on the error or on why the data is not available


### 2. Updating Data (PATCH)

To update the todo to completed, the app uses the `toggleComplete` function, which sends a `PATCH` request to modify a completed field of the specified record:
- `toggleComplete` updates the "completed" status of a todo item in the database.
- **Loading State**: During each request, the app identifies which specific task is being updated through the unique ID and displays an "Updating..." indicator only on that item.


### 3. Deleting Data (DELETE)

To delete todo from the database, the app uses the `deleteTodo` function, which makes a `DELETE` request to remove a specific record from the database:
- `deleteTodo` deletes the specified todo item from the database by identifying the ID of the specified Todo.
- **Loading State**: The app tracks which specific task is being deleted and displays a "Deleting..." indicator only on that item.

By monitoring and checking the loading states at different levels of each request, the app provides user feedback without blocking other interactions.