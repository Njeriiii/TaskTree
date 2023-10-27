import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useApi } from '../Contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';

// The DisplayBoard component is responsible for displaying the list of boards. 
// It uses the useEffect hook to fetch the list of boards from the server when the component mounts. 
// The 'created' parameter is passed to trigger a page reload when a new board is created. 
// Each board is displayed as a clickable Link component, allowing navigation to the board's tasks page.


function DisplayBoard( {created} ) {
    const [boards, setBoards] = useState([]);
    const api = useApi(); // Initialize the API client using the custom hook
    const navigate = useNavigate();

    // useEffect to fetch boards when the component mounts or 'created' changes
    useEffect(() => {
        // Fetch the list of boards from the API
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
    }, [api,created]);

    // Handle the click event for editing an item
    const editBoardClick = (boardId, boardTitle) => {
        // Redirect to the edit task page with the task ID as a URL parameter
        console.log(boardId)
        navigate(`/edit_board?board_id=${boardId}&board_title=${boardTitle}`);
    };

    return (
        <div className="boards-container">
            <h2 className="boards-title">Boards</h2>
            {boards.length === 0 ? (
                <p className="no-boards-message">There are no boards.</p>
            ) : (
                <ul className="board-list">
                    {boards.map(board => (
                        <li key={board.board_id} className="board-list-item">
                            {/* Use Link to create a clickable board title */}
                            <Link
                                to={`/display_tasks?board_id=${board.board_id}&board_title=${board.board_title}`}
                                className="board-link"
                            >
                                {board.board_title}
                            </Link>
                            {/* Button to add a task to this board */}
                            <button
                                onClick={() => navigate(`/add_task?board_id=${board.board_id}&board_title=${board.board_title}`)}
                                className="add-task-button"
                            >
                                + Add Task
                            </button>
                            <button onClick={() => editBoardClick(board.board_id, board.board_title)}className="edit-board-button">
                                <i className="fas fa-pencil-alt"></i> Edit
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default DisplayBoard;





