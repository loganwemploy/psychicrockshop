"use client";
import { useState } from "react";

const quizData = [
  { question: "What is 2*5?", choices: [2, 5, 10, 15, 20], correctAnswer: 2 },
  { question: "What is 3*6?", choices: [3, 6, 9, 12, 18], correctAnswer: 4 },
  { question: "What is 8*9?", choices: [72, 99, 108, 134, 156], correctAnswer: 0 },
  { question: "What is 1*7?", choices: [4, 5, 6, 7, 8], correctAnswer: 3 },
  { question: "What is 8*8?", choices: [20, 30, 40, 50, 64], correctAnswer: 4 },
];

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizData[questionIndex];

  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (answers[questionIndex] === null) {
      alert("Please make a selection!");
      return;
    }
    if (questionIndex < quizData.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setAnswers(Array(quizData.length).fill(null));
    setIsFinished(false);
  };

  const score = answers.filter(
    (answer, i) => answer === quizData[i].correctAnswer
  ).length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 text-gray-800 transition-all duration-300">
        {!isFinished ? (
          <>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Question {questionIndex + 1} of {quizData.length}
            </h2>
            <p className="text-gray-700 mb-4">{currentQuestion.question}</p>
            <ul className="space-y-2 mb-6">
              {currentQuestion.choices.map((choice, index) => (
                <li key={index}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={index}
                      checked={answers[questionIndex] === index}
                      onChange={() => handleAnswerChange(index)}
                      className="text-indigo-600"
                    />
                    <span>{choice}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={questionIndex === 0}
                className={`px-4 py-2 rounded-md text-white ${
                  questionIndex === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                {questionIndex === quizData.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Results</h2>
            <p className="text-lg text-gray-700 mb-6">
              You got <span className="font-semibold">{score}</span> out of{" "}
              {quizData.length} correct!
            </p>
            <button
              onClick={handleRestart}
              className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
