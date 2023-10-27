import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';

// The ChangeBoard component handles the process of moving a subtask to a different board.

const ChangeBoard = () => {
    // Retrieve the current location using React Router's useLocation
    const location = useLocation();

    // Initialize the router navigation function
    const navigate = useNavigate();

    // Initialize the API client using a custom hook
    const api = useApi();

    // Initialize state to store the list of boards
    const [boardList, setBoardList] = useState([]);

    // Initialize state to store the selected board's ID
    const [selectedBoardId, setselectedBoardId] = useState('');

    // Retrieve the task ID and task description from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const taskId = parseInt(queryParams.get('task_id'));
    const taskDescription = queryParams.get('task_description');

    // Fetch the list of boards from the API
    const fetchData = async () => {
        try {

        const response = await api.get('/get_boards');

        if (response.status === 200) {
            setBoardList(response.body.boards);
        } else {
            console.error('Failed to fetch tasks');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData(); 
    });

    // Handle changes in the selected destination board
    const handleBoardChange = (e) => {
        setselectedBoardId(e.target.value);
    };




    // Handle the action of moving a subtask to a different board
    const handleMoveTask = async () => {
        try {
        const response = await api.put(
            `/change_board?task_id=${taskId}&new_board_id=${selectedBoardId}`
        );
    
        if (response.status === 200) {
            console.log('Task moved successfully');

            const selectedBoardTitle = boardList.filter(board => board.board_id === parseInt(selectedBoardId))[0].board_title;

            navigate(`/display_tasks?board_id=${selectedBoardId}&board_title=${selectedBoardTitle}`)

        } else {
            console.error('Failed to move Task');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    // Handle the 'Cancel' action
    const onCancel = async () => {
        navigate(-1)
    };

return (
    <div className="change-parent-task-container">
        <p>Move Task: {taskDescription}</p>
        {/* Select input for choosing a destination board */}
        <select
            className="destination-root-task-select"
            value={selectedBoardId}
            onChange={handleBoardChange}
        >
            <option value="">Select a destination Board </option>
            {/* Dynamically generate options based on the list of boards */}
            {boardList.map((board) => (
                <option
                    key={board.board_id}
                    value={board.board_id}
                    className="root-task-option"
                >
                    {board.board_title}
                </option>
            ))}
        </select>
        {/* Button to initiate the task movement */}
        <button className="move-subtask-button" onClick={handleMoveTask}>
            Move Subtask
        </button>
        {/* Button to cancel the action and return to the previous page */}
        <button className="cancel-button" onClick={onCancel}>
            Cancel
        </button>
    </div>

);
};
export default ChangeBoard;