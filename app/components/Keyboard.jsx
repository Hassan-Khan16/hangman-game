import React from "react";

const Keyboard = ({ handleGuess, guessedLetters, wrongGuessedLetters,isDisabled }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard-container">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={isDisabled || (guessedLetters.includes(letter) || wrongGuessedLetters.includes(letter))}
          className="keyboard-button"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
