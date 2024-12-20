import React, { useEffect, useState } from 'react';
import { FaGamepad, FaUsers, FaChartBar, FaPlus } from 'react-icons/fa';
import AddGame from './addGame'; // Ensure the correct path to AddGame component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { TableAll } from './tables';
import GamePopup from "./viewGame.jsx";
import {gameCount } from '../../../services/gameService.jsx';

const AdminGame = () => {
    const [isAddGameOpen, setIsAddGameOpen] = useState(false);
    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);

    // Handle adding a new game
    const handleAddGame = (newGame) => {
        setGames([...games, { ...newGame, id: games.length + 1 }]);
        setIsAddGameOpen(false);
        window.location.reload();
    };

    // Fetch game count
    useEffect(() => {
        gameCount()
            .then(response => {
                console.log(response);
                setTotalGames(response);
                console.log(response);
            })
            .catch(error => {
                console.log('Error Fetching game count', error);
            });
    }, []);

    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4">
            <h1 className="text-xl font-semibold mb-4">GAME</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>
                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>Total Games</CardDescription>
                            <CardTitle>{totalGames}</CardTitle>
                        </CardHeader>
                        <FaGamepad className="text-4xl text-blue-500 mt-7 mr-4"/>
                    </div>
                </Card>

                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Active Players</CardDescription>
                            <CardTitle>500</CardTitle>
                        </CardHeader>
                        <FaUsers className="text-4xl text-green-500 mt-7 mr-4"/>
                    </div>
                </Card>

                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Game Statistics</CardDescription>
                            <CardTitle>Stats here</CardTitle> {/* Replace "Stats here" with relevant stats */}
                        </CardHeader>
                        <FaChartBar className="text-4xl text-yellow-500 mt-7 mr-4"/>
                    </div>
                </Card>
            </div>

            {/* Add Game Button */}
            <div className="flex justify-end w-full mb-4">
                <button
                    onClick={() => setIsAddGameOpen(true)} // Open the modal when the button is clicked
                    className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800">
                    <FaPlus className="mr-2"/>
                    Add Game
                </button>
            </div>

            {/* Games Table */}
            <TableAll games={games}/>

            {/* Add Game Modal */}
            {isAddGameOpen && (
                <AddGame
                    isOpen={isAddGameOpen}
                    onClose={() => setIsAddGameOpen(false)}
                    onAddGame={handleAddGame}
                />
            )}

        </div>
    );
};

export default AdminGame;
