### Important Links
https://dba.stackexchange.com/questions/81311/why-would-a-table-use-its-primary-key-as-a-foreign-key-to-itself

## Initialising the app
export FLASK_APP=backend
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=5162


## React Concepts Used

1. **Functional Components**: Both `AddTaskPage` and `TaskListPage` are functional components, defining UI components using JavaScript functions.

2. **State**: React's `useState` hook is used to manage and update component state, storing and managing data that can change over time.

3. **Effect Hook (useEffect)**: The `useEffect` hook handles side effects in React components. It's used in `TaskListPage` to fetch data when the component mounts.

4. **Axios for HTTP Requests**: Axios is used to make HTTP requests to the backend server, a popular library for asynchronous requests in React apps.

5. **React Router**: React Router handles client-side routing, allowing navigation between different views or components without page reloads. `useLocation` and `useNavigate` are used for routing.

6. **Conditional Rendering**: Conditional rendering is used to render components or elements based on conditions. In `TaskListPage`, the task list is conditionally rendered based on the current route.

7. **Form Handling**: `AddTaskPage` manages form data using state (`useState`) and handles form submission via the `handleSubmit` event handler.

8. **State Updates**: State updates use functions like `setTask` and `setStatus` in `AddTaskPage` to update state and trigger re-renders.

9. **Button Click Handlers**: Event handlers handle button clicks, such as task deletion in `TaskListPage`.

10. **Mapping Data**: Fetched data is mapped to render dynamic lists of tasks using the `map` function.

11. **CSS Styling**: CSS styles are applied to elements within components to control layout and appearance. CSS can be added directly to component files or imported from external stylesheets.

12. **Client-Side Routing**: React Router is used for client-side routing, defining links with `Link` and managing navigation with `useNavigate`.

13. **Component Composition**: Multiple components (`AddTaskPage`, `TaskListPage`, `Header`) are composed together to build the UI in the `App` component.

These are key React concepts and features illustrated in the provided code, essential for developing React applications.



## Adding Subtasks

1. In your `Task` component:
   - You define a `handleAddSubTaskClick` function that is triggered when the "Add Subtask" button is clicked.
   - Within this function, you use the `useNavigate` hook from 'react-router-dom' to get the navigation function.

2. When the "Add Subtask" button is clicked, the `handleAddSubTaskClick` function is called.
   - It uses the `navigate` function to redirect to the "Add Task" page ('/add_task') and includes a query parameter 'parent_task_id' with the value of the current `task.id`.

3. In your `AddTask` component:
   - You also use the `useNavigate` hook to get the navigation function.
   - You use the `useLocation` hook to access the current location and its search parameters.

4. In the `AddTask` component, you retrieve the 'parent_task_id' from the URL parameters using the `useLocation` and `URLSearchParams` to parse the search parameters.

5. When you submit the form in the `AddTask` component, you send a POST request to the '/add_task' endpoint, including the 'task' description, 'status', and 'parent_task_id'.

6. Upon successful completion of the task addition, you can use the 'newlyAddedTask' and 'currentParentTask' state variables to track the newly added task and its relationship with the parent task.

In summary, when you click the "Add Subtask" button in the `Task` component, you navigate to the "Add Task" page with the 'parent_task_id' as a query parameter. In the "Add Task" page, you extract and use this 'parent_task_id' to establish the relationship between the newly added subtask and its parent task.



### DB schema for the database where each task is linked to a user:

**User Table:**
- `id` (Primary Key, Integer): Unique identifier for each user.
- `first_name` (String): First name of the user.
- `last_name` (String): Last name of the user.
- `email` (String): Email address of the user (should be unique).
- `password` (String): Hashed password of the user.
- `tasks` (Relationship to Task): One-to-Many relationship linking users to their tasks.

**Task Table:**
- `id` (Primary Key, Integer): Unique identifier for each task.
- `task_description` (String): Description of the task.
- `status` (String): Status of the task (e.g., "new," "pending," "completed").
- `user_id` (Foreign Key, Integer): The ID of the user who owns the task (linked to the `User` table).
- `parent_id` (Foreign Key, Integer): The ID of the parent task if it's a subtask (self-referencing).

With this schema, each user can have multiple tasks associated with them, and tasks can have a `user_id` field to establish a link to the user who owns that task. Additionally, you can have subtasks by using the `parent_id` field to create a self-referencing relationship within the `Task` table.