import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames } from '../../services/gameService'; // Adjust the path as needed

const EasyLevelPage = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const allGames = await getAllGames();
                const easyGames = allGames.filter(game => game.gameLevel === 'easy'); // Filter for easy level
                setGames(easyGames);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError('Failed to load games. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleBack = () => {
        navigate('/user-game');
    };

    const handlePlay = (gameId) => {
        navigate(`/quiz/${gameId}`); // Correctly navigating to the quiz page with gameId
    };

    return (
        <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center px-4 py-8">
            <div className="text-center">
                <h2 className="text-5xl font-extrabold mb-8 text-yellow-400 neon-shadow">
                    Easy Level Games
                </h2>
                {loading && <p className="text-lg text-gray-300">Loading games...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && games.length === 0 && (
                    <p className="text-gray-300">No easy-level games available.</p>
                )}
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {games.map((game, index) => (
                        <li
                            key={index}
                            className="p-6 bg-gradient-to-br from-blue-700 to-blue-500 text-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                        >
                            <h3 className="text-2xl font-bold mb-2 text-yellow-300 neon-shadow">
                                {game.gameName}
                            </h3>
                            <p className="text-gray-200">{game.gameDescription}</p>
                            <div
                                onClick={() => handlePlay(game.id)} // Assuming game.id is the correct property name
                                className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg shadow-md text-sm font-bold uppercase tracking-wide text-center cursor-pointer"
                            >
                                Play
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleBack}
                    className="mt-8 px-8 py-3 bg-red-600 text-lg font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-red-500 hover:shadow-xl transition transform hover:scale-105"
                >
                    Back to Level Selection
                </button>
            </div>
        </div>
    );
};

export default EasyLevelPage;
