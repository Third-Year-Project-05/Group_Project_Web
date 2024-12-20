import React, { useState } from 'react';
import Header from '../../components/user/game/Header.jsx';
import GameInterface from '../../components/user/game/GameInterface.jsx';
import Leaderboard from '../../components/user/game/Leaderboard.jsx';
import CurrentScore from '../../components/user/game/CurrentScore.jsx';
import LeaderboardData from '../../components/user/game/LeaderboardData.jsx';
import LevelSelectionModal from '../../components/user/game/LevelSelection.jsx';


const Game = () => {
    const [currentScore, setCurrentScore] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const startGame = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectLevel = (level) => {
        console.log(`Selected Level: ${level}`);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-inherit">
            <Header />
            <div className="flex items-start justify-center p-8 space-x-6">
                <Leaderboard data={LeaderboardData} />
                <GameInterface onPlay={startGame} />
                <CurrentScore score={currentScore} />
            </div>
            <LevelSelectionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSelectLevel={handleSelectLevel}
            />
        </div>
    );
};

export default Game;
