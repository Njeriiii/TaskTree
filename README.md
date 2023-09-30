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
