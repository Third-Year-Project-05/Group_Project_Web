import React from 'react';
import AddGameModal from '../../../components/game/AddGameModal.jsx';
import { createGame } from '../../../services/gameService.jsx'; // Adjust import path if necessary

const AddGame = ({ isOpen, onClose, onAddGame }) => {
    const handleAddGame = async (gameData) => {
        try {
            const response = await createGame(gameData); // Use createGame from your service
            console.log('Game added successfully', response);
            onAddGame(gameData); // Call onAddGame to update the games list
            onClose(); // Close the modal after successful addition
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    return (
        <div className="p-8">
            {/* Add Game Modal */}
            <AddGameModal
                isOpen={isOpen} // Pass the modal open state
                onClose={onClose} // Close modal callback
                onAddGame={handleAddGame} // Handle add game callback
            />
        </div>
    );
};

export default AddGame;
