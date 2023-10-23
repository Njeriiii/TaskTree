import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useApi } from '../Contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';

function DisplayBoard() {
    const [boards, setBoards] = useState([]);
    const api = useApi(); // Initialize the API client using the custom hook
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of boards from the API when the component mounts
        const fetchBoards = async () => {
            try {
                const response = await api.get('/get_boards');
                if (response.status === 200) {
                    setBoards(response.body.boards);
                } else {
                    console.error('Failed to fetch boards');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBoards();
    }, [api]);

    return (
        <div>
            <h2>Boards</h2>
            {boards.length === 0 ? (
                <p>There are no boards.</p>
            ) : (
                <ul>
                    {boards.map(board => (
                        <li key={board.board_id}>
                            {/* Use Link to create a clickable board title */}
                            <Link
                                to={`/task_tree?board_id=${board.board_id}`}
                                // to={"/task_tree"}
                                className="board-link"
                            >
                                {board.board_title}
                            </Link>
                            {/* Button to add a task for this board */}
                            <button
                                onClick={() => navigate(`/add_task?board_id=${board.board_id}`)}
                                className="add-task-button"
                            >
                                Add Task
                            </button>
                            {/* You can add more details or actions related to the boards here */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DisplayBoard;





