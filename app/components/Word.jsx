import React from "react";

const Word = ({ word, guessedLetters }) => {
  return (
    <div className="word-container">
      {word.split("").map((letter, index) =>
        guessedLetters.includes(letter) ? letter : "_"
      ).join(" ")}
    </div>
  );
};

export default Word;
