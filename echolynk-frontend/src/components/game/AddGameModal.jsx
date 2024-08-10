import React, { useState, useEffect } from 'react';
import GameDetailsForm from './GameDetailsForm.jsx';
import QuestionForm from './QuestionForm.jsx';

const AddGameModal = ({ isOpen, onClose, onAddGame }) => {
    const [gameName, setGameName] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [gameLevel, setGameLevel] = useState('');
    const [rounds, setRounds] = useState(0);
    const [gameImage, setGameImage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (rounds > 0) {
            setQuestions(Array.from({ length: rounds }, () => ({
                answers: Array(4).fill(''),
                correctAnswers: [],
                mark: '',
                media: ''
            })));
        }
    }, [rounds]);

    const handleGameImageChange = (e) => {
        setGameImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleQuestionChange = (index, key, value) => {
        const newQuestions = [...questions];
        newQuestions[index][key] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        const correctAnswers = newQuestions[questionIndex].correctAnswers;
        if (correctAnswers.includes(answerIndex)) {
            newQuestions[questionIndex].correctAnswers = correctAnswers.filter(index => index !== answerIndex);
        } else {
            newQuestions[questionIndex].correctAnswers.push(answerIndex);
        }
        setQuestions(newQuestions);
    };

    const handleQuestionMediaChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].media = URL.createObjectURL(e.target.files[0]);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGame({ gameName, gameDescription, gameLevel, rounds, gameImage, questions });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
                {step === 1 ? (
                    <GameDetailsForm
                        gameName={gameName}
                        setGameName={setGameName}
                        gameDescription={gameDescription}
                        setGameDescription={setGameDescription}
                        gameLevel={gameLevel}
                        setGameLevel={setGameLevel}
                        rounds={rounds}
                        setRounds={setRounds}
                        gameImage={gameImage}
                        handleGameImageChange={handleGameImageChange}
                        onNext={() => setStep(2)}
                    />
                ) : (
                    <QuestionForm
                        questions={questions}
                        rounds={rounds}
                        handleQuestionChange={handleQuestionChange}
                        handleAnswerChange={handleAnswerChange}
                        handleCorrectAnswerChange={handleCorrectAnswerChange}
                        handleQuestionMediaChange={handleQuestionMediaChange}
                        onBack={() => setStep(1)}
                        onSubmit={handleSubmit}
                    />
                )}
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 mt-4"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddGameModal;
