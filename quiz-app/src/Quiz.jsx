import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Timer from "./Timer";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Fetch questions from the API
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
      .then((response) => setQuestions(response.data.results))
      .catch(() => alert("Error loading questions"));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div>
      {finished ? (
        <h2>
          Quiz Finished! <br /> Your Score: {score} / {questions.length}
        </h2>
      ) : questions.length > 0 ? (
        <div>
          <Timer key={currentIndex} duration={15} onTimeout={() => handleAnswer(false)} />
          <Question questionData={questions[currentIndex]} onAnswer={handleAnswer} />
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
