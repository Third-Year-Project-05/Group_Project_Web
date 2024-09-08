import React from 'react';

const GameDetailsForm = ({ gameName, setGameName, gameDescription, setGameDescription, gameLevel, setGameLevel, rounds, setRounds, gameImage, handleGameImageChange, onNext }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Game Name</label>
                <input
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Description</label>
                <input
                    type="text"
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Level</label>
                <input
                    type="text"
                    value={gameLevel}
                    onChange={(e) => setGameLevel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Number of Rounds</label>
                <input
                    type="number"
                    value={rounds}
                    onChange={(e) => setRounds(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white">Game Image</label>
                <input
                    type="file"
                    onChange={handleGameImageChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    accept="image/*"
                    required
                />
                {gameImage && <img src={gameImage} alt="Game" className="mt-2 h-32" />}
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default GameDetailsForm;
