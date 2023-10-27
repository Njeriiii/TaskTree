**Database Schema Description:**

The code defines a database schema for a task management application. The schema consists of three main tables: `User`, `Board`, and `Task`, which are represented by the corresponding classes.

1. `User` Class:
   - Represents user data.
   - Columns:
     - `user_id`: Primary key, a unique identifier for each user.
     - `first_name`: User's first name.
     - `last_name`: User's last name.
     - `email`: User's email (unique).
     - `password`: Hashed password for authentication.
   - Relationships:
     - `tasks`: One-to-many relationship with tasks. Each user can have multiple tasks.
   - Methods:
     - `to_dict()`: Converts a user to a dictionary.
     - `get_id()`: Returns the user's ID as a string.

2. `Board` Class:
   - Represents boards in the application.
   - Columns:
     - `board_id`: Primary key, a unique identifier for each board.
     - `board_title`: Title of the board.
   - Relationships:
     - `tasks`: One-to-many relationship with tasks. Each board can have multiple tasks.
     - `user_id`: Foreign key to the `User` class, representing the owner of the board.
   - Methods:
     - `to_dict()`: Converts a board to a dictionary.

3. `Task` Class:
   - Represents tasks in the application.
   - Columns:
     - `task_id`: Primary key, a unique identifier for each task.
     - `task_description`: Description of the task.
     - `status`: Task status (default is "new").
   - Relationships:
     - `board_id`: Foreign key to the `Board` class, indicating the board to which the task belongs.
     - `parent_id`: Self-referencing foreign key, linking tasks to their parent tasks (enabling task hierarchy).
     - `user_id`: Foreign key to the `User` class, representing the owner of the task.
     - `board`: Many-to-one relationship with boards.
     - `parent`: Relationship to the parent task, allowing subtasks to have parent tasks.
   - Methods:
     - `to_dict()`: Converts a task to a dictionary.

This schema allows users to own boards, boards to contain tasks, and tasks to have subtasks. It is suitable for building a task management application with user authentication.

<br>

`__init__.py` <br>
- importing necessary libraries: `os`, `Flask`, `SQLAlchemy`, and `LoginManager`. 

- Inside the `create_app` function, an instance of the Flask application is created. 
- The `CORS` library is used to handle Cross-Origin Resource Sharing, which is important for handling web requests from different domains.
- Configuration settings are applied to the Flask app using the `app.config` dictionary. Settings like the secret key and the database URI are specified. The database URI points to a SQLite database, which will store application data.
- SQLAlchemy is initialized and associated with the Flask app using `db.init_app(app)`. This sets up the database connection and allows for the creation of database tables.
- `LoginManager` is initialized and associated with the app using `login_manager.init_app(app)`. This sets up user authentication functionality.

- Within the `app.app_context()`, the database tables are created with `db.create_all()`. This initializes the database schema based on the defined models.

- The package imports models and blueprints from submodules. Models define the structure of the database tables, and blueprints organize routes and views for different parts of the web application. These models and blueprints are registered with the Flask app, making them accessible for the application to use.



`auth.py`<br>
Descriptions of all the functions in `auth.py`.

1. `register()`: Handles user registration and returns user info if successful.

2. `login()`: Handles user login and returns user info if successful.

3. `logout()`: Handles user logout and returns a success message.

4. `get_current_user()`: Retrieves the current user's info if authorized.

5. `check_authentication()`: Checks and returns user authentication status.

<br>

`main.py` <br>
Descriptions of all the functions in `main.py`.
1. `get_boards`: Retrieve boards associated with the current user.

2. `create_board`: Create a new board for the current user.

3. `update_board`: Update an existing Board with new information.

4. `get_tasks`: Retrieve tasks associated with the current user.

5. `add_task`: Add a new task for the current user.

6. `update_task`: Update an existing task with new information.

7. `mark_task_complete`: Mark a task as 'completed'.

8. `change_board`: Move a task to a different board.