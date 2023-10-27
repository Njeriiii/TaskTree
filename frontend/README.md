
<br><br>

`ApiClient.js`<br>
The **ApiClient class** encapsulates common functionality for making HTTP requests, such as GET, POST, PUT, and DELETE, while abstracting the handling of query parameters, request headers, and error responses. This promotes code reusability and maintainability.

`ApiProvider.js`:<br>
**ApiProvider Component**: The `ApiProvider` component is responsible for wrapping its children components with the API context. When you wrap your application's root component with `ApiProvider`, it ensures that any component within the application can access the API client using the `useApi` hook. This promotes a clean and centralized way of managing API requests and keeps the API client instance consistent across the application.

`AuthProvider.js`<br>
**AuthProvider Component**: The `AuthProvider` component is designed to wrap its children with the authentication context. By doing this, any component in the application can easily access and manage user authentication status using the `useAuth` hook. This approach centralizes user authentication, making it easier to handle login, logout, and user-related actions consistently across the application.

`TasksProvider.js`<br>
**TasksProvider Component**: The `TasksProvider` component is responsible for wrapping its children with the tasks context. It uses a custom hook, `useApi`, to initialize the API client and fetch the task data from the API when the component mounts. By providing tasks data through the context, any component in the application can access and work with the task data consistently.

<br>

`Header.js`<br>
The **Header component** provides a dynamic header that adapts based on the user's authentication status and loading state. It offers navigation links and options for signing up or logging in when not authenticated, and user details and a logout option when authenticated.

<br>

`Register.js`, `Login.js` & `Logout.js`<br>
Certainly! Here are short statements defining what each component does:

1. **Registration Component**:
   - Presents a registration form for users to sign up by providing their email, first name, last name, and password.
   - Uses the `useAuth` hook to access the `handleSignUp` function for user registration.
   - Handles registration errors and provides feedback to the user.

2. **Login Component**:
   - Provides a login form for users to enter their email and password.
   - Utilizes the `useAuth` hook to handle user authentication.
   - Calls the `handleLogin` function from the `useAuth` hook to log in the user.

3. **Logout Component**:
   - Displays a welcome message with the user's first name.
   - Offers a "Logout" button to log the user out.
   - Leverages the `useAuth` hook to interact with user authentication and the `useNavigate` hook for redirection after logout.

`CreateBoard.js` & `DisplayBoard.js`<br>
**CreateBoard Component:**
The `CreateBoard` component is responsible for rendering a form to create new boards. It uses React state to manage the title of the board and sends a POST request to the server when the form is submitted to create a new board. This component is connected to the API using the `useApi` custom hook and uses the `useNavigate` hook for navigation. It also utilizes the `DisplayBoard` component to display the list of boards, passing the 'created' parameter to trigger the reload of the board list when a new board is created.

**DisplayBoard Component:**
The `DisplayBoard` component is responsible for displaying the list of boards. It uses the `useEffect` hook to fetch the list of boards from the server when the component mounts and also listens for changes in the 'created' parameter. If 'created' changes, it re-fetches the list of boards, ensuring that the list is always up to date. Each board is displayed as a clickable `Link` component, allowing navigation to the board's tasks page.

**Connection:**
The `CreateBoard` component renders a form for creating boards, and after a new board is created, it sets the 'created' state to `true`. This 'created' state is passed as a parameter to the `DisplayBoard` component. When 'created' becomes `true`, the `useEffect` in `DisplayBoard` detects this change and re-fetches the list of boards from the server. This connection ensures that when a new board is created, the list of boards is automatically updated, creating a smooth user experience for managing boards and tasks.

<br><br>

`AddTask.js` & `AddTasksPage.js`<br>
**AddTask Component**: This component represents a form for adding new tasks. It uses React state to manage form input fields (task description and status). The component uses the `useApi` custom hook to access the API client and make a POST request to add a new task when the form is submitted. The form content depends on whether it's adding a top-level task or a subtask to a parent task.

**AddTasksPage**: The `AddTask` component is displayed within the `AddTasksPage`. In this page, the `AddTask` component is rendered, providing a user interface for adding new tasks. The form is displayed on the `AddTasksPage` with relevant input fields and buttons for creating and canceling the task creation process. The page allows users to interact with the form to add tasks, and upon submission, the task is created using API requests. 

<br><br>

`Task.js` & `DisplayTasks.js`<br>
**DisplayTasks component:** This component retrieves tasks based on the `board_id` from the URL query parameters and passes each task to the `Task` component by mapping through them. This ensures that the `Task` component receives the appropriate task data as a prop, allowing it to display all tasks related to a board.

**Task component:** This component represents a single task within a task list. The component receives a task object as a prop from `DisplayTasks` component, enabling it to effectively present and control each task.

**createTaskTreeList function:** Embedded within `Task.js`, the `createTaskTreeList` function takes charge of constructing a hierarchical task structure with varying depths. This hierarchical structure is particularly useful when handling tasks and their corresponding subtasks, facilitating their presentation in an organized and indented list format. Collectively, these components and the createTaskTreeList function collaboratively to ensure the structured and user-friendly display and management of tasks and their subtasks.

<br><br>

`EditBoard.js`<br>
The **EditBoardForm component** offers an interface for editing boards details and handles the update process, interacting with both board data and the API for board management.

`EditTask.js`<br>
The **EditTaskForm component** offers an interface for editing task details and handles the update process, interacting with both task data and the API for task management.

<br>

`ChangeBoard.js`<br>
The **ChangeBoard component** provides a user interface for selecting a destination board and moving a subtask between boards, interacting with both the tasks' context and the API for task management.