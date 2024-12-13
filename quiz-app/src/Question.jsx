import React from "react";

const Question = ({ questionData, onAnswer }) => {
  const { question, correct_answer, incorrect_answers } = questionData;

  // Combine and shuffle options
  const options = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option === correct_answer)}
          dangerouslySetInnerHTML={{ __html: option }}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
};

export default Question;
