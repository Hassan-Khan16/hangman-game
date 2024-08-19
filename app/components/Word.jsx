import React from "react";

const Word = ({ word, guessedLetters }) => {
  return (
    <div style={{ fontSize: "24px", letterSpacing: "10px" }}>
      {word.split("").map((letter, index) =>
        guessedLetters.includes(letter) ? letter : "_"
      ).join(" ")}
    </div>
  );
};

export default Word;