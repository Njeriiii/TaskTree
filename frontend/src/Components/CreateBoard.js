import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';

function CreateBoard() {
    const api = useApi(); // Initialize the API client using the custom hook
    const [title, setTitle] = useState('');
    const [newlyAddedBoard, setNewlyAddedBoard] = useState(null);
    const navigate = useNavigate(); // Assuming you have the 'useNavigate' hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await api.post('/create_board', {
            title: title,
        });

        if (response.status === 200) {
            console.log(response);

            if (response.data) {
            console.log('Board created:', response.data.board_id);

            // Clear the title input field
            setTitle('');

            // Store the newly created board
            setNewlyAddedBoard(response.data);

            // Redirect to the newly created board
            navigate(`/board/${response.data.board_id}`);
            } else {
            console.error('Response data is empty');
            }
        } else {
            console.error('Failed to create board');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div>
        <form className="board-form" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            />
            <button type="submit" className="add-button">
            Create Board
            </button>
        </form>

        {/* Display information about the newly created board */}
        {newlyAddedBoard && (
            <div>
            <p>Newly Created Board:</p>
            <p>Title: {newlyAddedBoard.title}</p>
            <p>ID: {newlyAddedBoard.board_id}</p>
            </div>
        )}
        </div>
    );
    }

export default CreateBoard;
