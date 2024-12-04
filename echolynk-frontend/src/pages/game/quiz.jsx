import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getQuestionsForGame } from "../../services/gameService";
import { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const QuizPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalMarks, setTotalMarks] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchQuestionsWithImages = async () => {
    try {
      const fetchedQuestions = await getQuestionsForGame(gameId);
      const questionsWithImageUrls = await Promise.all(
        fetchedQuestions.map(async (question) => {
          if (question.questionImage) {
            const imageRef = ref(storage, `quiz_images/${question.questionImage}`);
            const imageUrl = await getDownloadURL(imageRef);
            return { ...question, questionImage: imageUrl };
          }
          return question;
        })
      );
      setQuestions(questionsWithImageUrls);
    } catch (err) {
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchQuestionsWithImages();
    } else {
      setError("Game ID is missing. Unable to load quiz.");
      setLoading(false);
    }
  }, [gameId]);

  const handleOptionChange = (option) => setSelectedOption(option);

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an answer!");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setFeedback(isCorrect ? "Correct!" : "Incorrect");
    if (isCorrect) setTotalMarks((prevMarks) => prevMarks + currentQuestion.mark);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setShowPopup(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowPopup(false);
    navigate("/user-game"); // Navigate back to /game after showing marks
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-800 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        {currentQuestion.questionImage && (
          <img
            className="w-full h-64 object-cover rounded-lg mb-4"
            src={currentQuestion.questionImage}
            alt="Question"
          />
        )}
        <p className="text-lg mb-2">{currentQuestion.text}</p>
        <p className="text-sm text-gray-400 mb-4">Marks: {currentQuestion.mark}</p>
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => (
            <label
              className="block p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
              key={index}
            >
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedOption === answer}
                onChange={() => handleOptionChange(answer)}
                className="mr-3"
              />
              {answer}
            </label>
          ))}
        </div>
        {feedback && (
          <p
            className={`mt-4 text-lg ${
              feedback === "Correct!" ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback}
          </p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg disabled:opacity-50 transition"
          onClick={handleSubmit}
          disabled={feedback !== null}
        >
          Submit
        </button>
        {feedback && (
          <button
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg shadow-lg transition"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
            <p className="mb-4">Your Total Marks: {totalMarks}</p>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition"
              onClick={handleFinishQuiz} // Redirect to /game on finish
            >
              Go Back to Games
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
