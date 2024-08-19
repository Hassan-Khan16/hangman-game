import React from "react";

const Keyboard = ({ handleGuess, guessedLetters }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard-container">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter)}
          className="keyboard-button"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
