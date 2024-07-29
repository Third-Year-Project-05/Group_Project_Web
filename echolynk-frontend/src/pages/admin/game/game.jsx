import React, { useState } from 'react';
import { FaGamepad, FaUsers, FaChartBar, FaPlus } from 'react-icons/fa';
import AddGame from './addGame.jsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
import { TableAll } from './tables';

const AdminGame = () => {
    const [isAddGameOpen, setIsAddGameOpen] = useState(false);
    const [games, setGames] = useState([
        { id: 1, name: 'Sign Language Quiz', description: 'A quiz to learn and practice sign languages.', level: 'Beginner', rounds: 10 },
        { id: 2, name: 'Sign Language Quiz', description: 'A quiz to learn and practice sign languages.', level: 'Intermediate', rounds: 20 },
        { id: 3, name: 'Sign Language Quiz', description: 'A quiz to learn and practice sign languages.', level: 'Advanced', rounds: 30 },
    ]);

    const handleAddGame = (newGame) => {
        setGames([...games, { ...newGame, id: games.length + 1 }]);
    };

    return (
        <div className="flex flex-col justify-start items-start h-full mt-0 ml-4">
            <h1 className="text-xl font-semibold mb-4">GAME</h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
                <Card className='shadow-lg'>
                    <div className='flex flex-row justify-between items-start w-full'>

                        <CardHeader className='gap-5'>
                            <CardDescription style={{fontSize: '18px'}}>Total Games</CardDescription>
                            <CardTitle>{games.length}</CardTitle>
                        </CardHeader>

                        <FaGamepad className="text-4xl text-blue-500 mt-7 mr-4"/>
                    </div>

                </Card>


                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Active Players</CardDescription>
                            <CardTitle>500</CardTitle> {/* Replace 500 with dynamic count */}
                        </CardHeader>
                        <FaUsers className="text-4xl text-green-500 mt-7 mr-4" />
                    </div>
                </Card>
                
                <Card className="shadow-lg">
                    <div className="flex flex-row justify-between items-start w-full">
                        <CardHeader className="gap-5">
                            <CardDescription style={{fontSize: '18px'}}>Game Statistics</CardDescription>
                            <CardTitle>Stats here</CardTitle> {/* Replace "Stats here" with relevant stats */}
                        </CardHeader>
                        <FaChartBar className="text-4xl text-yellow-500 mt-7 mr-4" />
                    </div>
                </Card>
            </div>

            {/* Add Game Button */}
            <div className="flex justify-end w-full mb-4">
                <button
                    onClick={() => setIsAddGameOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800">
                    <FaPlus className="mr-2" />
                    Add Game
                </button>
            </div>

            {/* Games Table */}
            <TableAll />

            <AddGame isOpen={isAddGameOpen} onClose={() => setIsAddGameOpen(false)} onAddGame={handleAddGame} />

        </div>
    );
}

export default AdminGame;
