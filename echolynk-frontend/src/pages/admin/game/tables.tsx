import React, { useState, useEffect } from 'react';
import { Game, columnsAll } from "./table-col";
import { DataTable } from "../../../components/admin/data-table";
import { getAllGames } from "../../../services/gameService";
import GamePopup from './viewGame'; // Import the GamePopup component

type TableAllProps = {
    onRowClick: (game: Game) => void;
};

export function TableAll({ onRowClick }: TableAllProps) {
    const [dataAll, setDataAll] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getAllGames();
                setDataAll(response);
                console.log('Games:', response);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRowClick = (game: Game) => {
        setSelectedGame(game);
    };

    const handleClosePopup = () => {
        setSelectedGame(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-5">
            <DataTable
                columns={columnsAll}
                data={dataAll}
                onRowClick={handleRowClick}
            />
            {selectedGame && (
                <GamePopup
                    game={selectedGame}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
}
