import React, { useState } from 'react';
import {XIcon} from "lucide-react";


const GamePopup = ({ game, onClose }) => {

   if (!game) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-90 flex justify-center items-center z-10">
            <div className="bg-white dark:bg-gray-900 rounded-lg h-auto w-3/6 p-12 overflow-y-scroll">
                <button
                    className="float-end relative left-5 bottom-5 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>
                <div className='flex flex-row gap-12'>
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src={game.gameImage} alt="user" className='h-[12rem] w-[12rem] rounded-full' />
                    <div className='flex flex-col gap-3'>
                        <div className="mb-2">
                            {/* eslint-disable-next-line react/prop-types */}
                            <strong>Game Name: </strong>{game.gameName}
                        </div>
                        <div className="mb-2">
                            {/* eslint-disable-next-line react/prop-types */}
                            <strong>Game Description: </strong>{game.gameDescription}
                        </div>
                        <div className="mb-2">
                            {/* eslint-disable-next-line react/prop-types */}
                            <strong>Game Level: </strong>{game.gameLevel}
                        </div>
                        <div className="mb-2">
                            {/* eslint-disable-next-line react/prop-types */}
                            <strong>No.of Rounds: </strong>{game.rounds}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePopup;
