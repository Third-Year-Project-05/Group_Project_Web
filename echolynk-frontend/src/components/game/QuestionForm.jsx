import React from 'react';

const QuestionForm = ({
                          questions,
                          rounds,
                          handleQuestionChange,
                          handleAnswerChange,
                          handleCorrectAnswerChange,
                          handleQuestionMediaChange,
                          onBack,
                          onSubmit
                      }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < rounds - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const isLastQuestion = currentQuestionIndex === rounds - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4 p-4 border border-gray-300 rounded shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
                <div className="mb-2">
                    <label className="block text-gray-700 dark:text-white">Image/Video/GIF</label>
                    <input
                        type="file"
                        onChange={(e) => handleQuestionMediaChange(currentQuestionIndex, e)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        accept="image/*,video/*"
                        required
                    />
                    {questions[currentQuestionIndex]?.media && (
                        questions[currentQuestionIndex].media.includes('video') ? (
                            <video src={questions[currentQuestionIndex].media} className="mt-2 h-32" controls />
                        ) : (
                            <img src={questions[currentQuestionIndex].media} alt={`Question ${currentQuestionIndex + 1}`} className="mt-2 h-32" />
                        )
                    )}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 dark:text-white">Answers</label>
                    {Array.from({ length: 4 }).map((_, answerIndex) => (
                        <div key={answerIndex} className="flex items-center mb-1">
                            <input
                                type="text"
                                value={questions[currentQuestionIndex]?.answers[answerIndex] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestionIndex, answerIndex, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-2"
                                required
                            />
                            <input
                                type="checkbox"
                                checked={questions[currentQuestionIndex]?.correctAnswers?.includes(answerIndex) || false}
                                onChange={() => handleCorrectAnswerChange(currentQuestionIndex, answerIndex)}
                                className="ml-2 mt-2"
                            />
                        </div>
                    ))}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 dark:text-white">Mark</label>
                    <input
                        type="number"
                        value={questions[currentQuestionIndex]?.mark || ''}
                        onChange={(e) => handleQuestionChange(currentQuestionIndex, 'mark', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                {!isFirstQuestion && (
                    <button
                        type="button"
                        onClick={handlePrevious}
                        className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300"
                    >
                        Previous
                    </button>
                )}
                {isLastQuestion ? (
                    <button
                        type="submit"
                        className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300"
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition duration-300"
                    >
                        Next
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={onBack}
                className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 mt-4"
            >
                Back
            </button>
        </form>
    );
};

export default QuestionForm;
