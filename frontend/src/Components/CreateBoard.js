import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';
import DisplayBoard from '../Pages/DisplayBoard';

// The CreateBoard component is responsible for rendering a form to create new boards. 

function CreateBoard() {
    const [title, setTitle] = useState('');
    const [newlyAddedBoard, setNewlyAddedBoard] = useState(null);
    const [created, setCreated] = useState(false);

    // Get the navigation function for routing
    const navigate = useNavigate();
    
    // Initialize the API client using the custom hook
    const api = useApi();

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Send a POST request to create a new board
        const response = await api.post('/create_board', {
            title: title,
        });

        if (response.status === 200) {

            if (response.body) {
                // Store the newly created board
            setNewlyAddedBoard(response.body);
            console.log('Board created:', response.body.board_id);
            
            // If a board is successfully created, set 'created' to true
            setCreated(true)

            // Clear the title input field
            setTitle('');

            // Redirect to add tasks to the newly created board
            navigate(`add_task?board_id=${response.body.board_id}&board_title=${response.body.board_title}`);
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
        <div className="board-form-container">
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

            {/* Display the list of boards using the DisplayBoard component */}
            <DisplayBoard created={created} />
        </div>

    );
    }

export default CreateBoard;
