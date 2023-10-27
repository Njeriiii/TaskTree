import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiProvider';

//The EditBoardForm component is responsible for rendering and managing a form to edit a specific board. Here's what it does:


const EditBoardForm = () => {
    // Retrieve the current location from React Router
    const location = useLocation();
    
    
    // Initialize the router navigation function
    const navigate = useNavigate();
    
    // Initialize the API client using a custom hook
    const api = useApi();

    
    // Retrieve 'board_id' & 'board_title' from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const boardId = parseInt(queryParams.get('board_id'));
    const board_title = queryParams.get('board_title');


    // Initialize a state variable to hold the edited board
    const [editedBoard, setEditedBoard] = useState(board_title);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { value } = e.target;
        setEditedBoard(value);
    };

    // Handle the 'Save' action
    const onSave = async () => {
        try {
        const response = await api.put(`/update_board/${String(boardId)}`, { board_title: editedBoard }, {
            headers: {
            'Content-Type': 'application/json',
            },
            });
        

        if (response.status === 200) {
            console.log('Board updated:', editedBoard);

        } else {
            console.error('Failed to update board');
        }
        } catch (error) {
        console.error('Error:', error);
        }
        // Navigate back to previous page
        navigate(-1)
    };

    // Handle the 'Cancel' action
    const onCancel = async () => {
        // Navigate back to previous page
        navigate(-1)
    };

    return (
        <div className="edit-board-container">
            <form className="edit-board-form" onSubmit={(e) => e.preventDefault()}>
                
                {/* Board Description Input */}
                <div className="form-group">
                    <label className="form-label">Board Description</label>
                    <input
                        type="text"
                        name="board_title"
                        value={editedBoard || ''}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>

                {/* Save Button */}
                <button onClick={onSave} className="update-button">
                    Update Board
                </button>
            </form>

            {/* Cancel button */}
            <button onClick={onCancel} className="cancel-button">
                Cancel
            </button>
        </div>
    );
    };

export default EditBoardForm;