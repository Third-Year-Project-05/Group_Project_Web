import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import level1Image from '../../../assets/level-1.jpg'; // Correctly import the image

// Sample quiz data
const quizData = {
    1: [
        {
            question: "What is the American Sign Language (ASL) sign for 'thank you'?",
            image: level1Image, // Use the imported image
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 2"
        },
        // Add more quizzes for level 1 here
    ],
    // Add more levels and quizzes as needed
};

const QuizPage = () => {
    const { level } = useParams();
    const quizzes = quizData[level] || [];
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(750); // 12:30 minutes in seconds

    const quiz = quizzes[currentQuizIndex] || {};

    const handleAnswerClick = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption === quiz.correctAnswer) {
            alert("Correct!");
        } else {
            alert("Incorrect, try again!");
        }
    };

    const handleNextClick = () => {
        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setSelectedOption(null);
        } else {
            alert("You've completed all quizzes!");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl font-semibold mb-6">Quiz | Sign Language</h2>
            <p className="text-lg mb-2">Topic: American Sign Language (ASL)</p>
            <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
                {quiz.image && (
                    <img
                        src={quiz.image}
                        alt="Quiz"
                        className="w-full h-64 object-cover mb-4 rounded-lg"
                    />
                )}
                <p className="text-lg mb-4">{quiz.question}</p>
                <div className="space-y-3">
                    {quiz.options.map((option, index) => (
                        <label key={index} className="flex items-center">
                            <input
                                type="radio"
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleAnswerClick(option)}
                                className="form-radio text-orange-500 h-5 w-5"
                            />
                            <span className="ml-2">{option}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleNextClick}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition transform hover:scale-105"
                    >
                        Next
                    </button>
                    <div className="text-lg">
                        <span>{formatTime(timeRemaining)} Remaining</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition transform hover:scale-105"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
