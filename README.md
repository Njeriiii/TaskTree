**About the App: TaskTree - Your Task Manager**

TaskTree is a full-stack web application designed to help users manage their tasks and to-do lists in a structured and intuitive way. The app offers multiple features to ensure efficient task management, while respecting users' privacy and providing a seamless, nested task organization experience. Here are the key functionalities of TaskTree, focusing on the Minimum Viable Product (MVP) requirements:

**User Management:**
- TaskTree supports multiple users, and each user has a personalized environment.
- Users can create their own tasks, and they are isolated from other users' tasks to ensure data privacy.

**Task Management:**
- Users can create and manage tasks within the application.
- Tasks can be marked as complete, allowing users to track their progress.
- Tasks can be collapsed or expanded, offering a clean and organized view of tasks. This feature hides or shows subtasks, making it easier to focus on specific tasks.
- Users can move top-level tasks to different lists for better organization. 

**Data Storage:**
- TaskTree ensures data durability by saving task-related information in a database.
- The application utilizes SQLAlchemy to save user tasks.

**Nested Task Structure:**
- TaskTree allows tasks to be infinitely nested, providing a hierarchical structure for task organization.
- The app ensures that nested tasks render neatly on the screen, maintaining visibility and reasonable column widths for ease of use.

[Task Tree DEMO](https://www.loom.com/share/fb9dd29a68a040cf88bbe08629ae028e?sid=bfce9629-63a0-4935-b8fd-a73acf29b223)

<br><br>


Setting up "TaskTree" with separate directories for the backend (Flask) and frontend (React) involves several steps. Here's a guide on how to install and set up.

**1.Project Structure:**
```plaintext
TaskTree/            # Main project directory
├── backend/         # Backend directory containing Flask application
│   │   ├── auth/    # Authentication-related code
│   │   ├── main/    # Main application code
│   │   ├── __init__.py  # Flask application initialization
│   ├── venv/        # Python virtual environment (if used)
│   ├── requirements.txt  # Python dependencies
└── README.md        # Backend documentation
│
├── frontend/        # Frontend directory containing React application
│   ├── node_modules/  # Node.js packages (created when running npm install)
│   ├── public/       # Public assets
│   ├── src/          # React source code
|   |    ├──components
|   |    ├──contexts
|   |    ├──pages
|   ├── apiclient.js
│   ├── package.json  # Frontend dependencies and configuration
│   ├── package-lock.json  # Lock file for dependencies
│   └── README.md        # Frontend documentation 
└── README.md        # Project installation documentation 

```

**2. Set Up the Backend (Flask):**

Inside the "backend" directory, set up the Flask application:

**2.1. Initialize a Virtual Environment:**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
```

**2.2. Install the dependencies from the `requirements.txt ` file using `pip`:**

```bash
pip install -r requirements.txt
```

**2.3. Run the Flask App:**

Start your Flask app by running:

```bash
export FLASK_APP=backend
export FLASK_DEBUG=1
flask run --host=0.0.0.0 --port=5162
```

The Flask backend should now be running on `http://127.0.0.1:5162`.

**3. Set Up the Frontend (React):**

Inside the "frontend" directory, set up the React application:
```
cd frontend
```

**3.1. Install Axios:**

The React app needs to make API requests to your Flask backend, install Axios for handling HTTP requests:

```bash
cd frontend
npm install axios
```

**3.3. Start the React App:**

Run your React development server:

```bash
npm start
```

Your React frontend should now be running on `http://localhost:3000`.

**4. Connect the Frontend and Backend:**

**4.1. Proxy Setup :**

The Flask and React apps are running on different ports during development, set up a proxy configuration in the React app's `package.json` to handle API requests. This helps avoid CORS issues.

Example `package.json` in the "frontend/client" directory:

```json
"proxy": "http://127.0.0.1:5162"
```