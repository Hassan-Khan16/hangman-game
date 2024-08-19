import React from "react";

const Keyboard = ({ handleGuess, guessedLetters }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "10px", marginTop: "20px" }}>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
