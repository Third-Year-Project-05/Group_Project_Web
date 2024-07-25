import React, { useState } from 'react';

const AddGame = ({ isOpen, onClose, onAddGame }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [rounds, setRounds] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGame({ name, description, level, rounds, profileImage, questions });
        onClose();
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, media: '', answers: ['', '', '', ''], correctAnswers: [], mark: '' }]);
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

    const handleProfileImageChange = (e) => {
        setProfileImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleQuestionMediaChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].media = URL.createObjectURL(e.target.files[0]);
        setQuestions(newQuestions);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Add Game</h2>

                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Game Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-white">Level</label>
                                <input
                                    type="text"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
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
                                <label className="block text-gray-700 dark:text-white">Profile Image</label>
                                <input
                                    type="file"
                                    onChange={handleProfileImageChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    accept="image/*"
                                    required
                                />
                                {profileImage && <img src={profileImage} alt="Profile" className="mt-2 h-32" />}
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </form>

                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Add Questions</h2>

                        <form onSubmit={handleSubmit}>
                            {Array.from({ length: rounds }).map((_, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 dark:text-white">Image/Video/GIF</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleQuestionMediaChange(index, e)}
                                            className="w-full p-2 border border-gray-300 rounded mt-2"
                                            accept="image/*,video/*"
                                            required
                                        />
                                        {questions[index]?.media && (
                                            questions[index].media.includes('video') ? (
                                                <video src={questions[index].media} className="mt-2 h-32" controls />
                                            ) : (
                                                <img src={questions[index].media} alt={`Question ${index + 1}`} className="mt-2 h-32" />
                                            )
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 dark:text-white">Answers</label>
                                        {Array.from({ length: 4 }).map((_, answerIndex) => (
                                            <div key={answerIndex} className="flex items-center mb-1">
                                                <input
                                                    type="text"
                                                    value={questions[index]?.answers[answerIndex] || ''}
                                                    onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                                    required
                                                />
                                                <input
                                                    type="checkbox"
                                                    checked={questions[index]?.correctAnswers.includes(answerIndex)}
                                                    onChange={() => handleCorrectAnswerChange(index, answerIndex)}
                                                    className="ml-2 mt-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 dark:text-white">Mark</label>
                                        <input
                                            type="number"
                                            value={questions[index]?.mark || ''}
                                            onChange={(e) => handleQuestionChange(index, 'mark', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded mt-2"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300"
                                >
                                    Add Game
                                </button>
                            </div>
                        </form>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AddGame;
