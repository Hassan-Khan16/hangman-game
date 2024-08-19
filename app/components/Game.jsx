"use client"
import React, { useEffect, useState } from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";

const Game = () => {

    const [word, setWord] = useState("hangman".toUpperCase());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);


    useEffect(
        () => {
            // fetch("https://random-word-api.herokuapp.com/word").
            //     then(res => res.json()).
            //     then(data => {
            //         const fetchedWord = data[0].toUpperCase();
            //         console.log(fetchedWord);
            //         setWord(fetchedWord);
            //     })
            fetch('https://random-word-api.vercel.app/api?words').
                then(res => res.json()).
                then(data => {
                    const fetchedWord = data[0].toUpperCase();
                    console.log(fetchedWord);
                    setWord(fetchedWord);
                })
        }, []
    )
    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter)) return;

        if (word.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setWrongGuesses(wrongGuesses + 1);
        }
    };

    function handleButton() {
        location.reload();
    }

    const isGameOver = wrongGuesses >= word.length;
    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter));

    return (
        <div>
            <h1>Hangman Game</h1>
            <Word word={word} guessedLetters={guessedLetters} />
            <Keyboard handleGuess={handleGuess} guessedLetters={guessedLetters} />
            {isGameOver && <p>You lost! The word was {word}.</p>}
            {isGameWon && <p>Congratulations! You've won!</p>}
            {!(isGameOver || isGameWon) && <p>The number of guesses remaining {word.length - wrongGuesses}. </p>}
            {
                (isGameOver || isGameWon) &&
                <button onClick={handleButton}>Play again</button>
            }
        </div>
    );
};

export default Game;