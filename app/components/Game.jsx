"use client"
import React, { useEffect, useState } from "react";
import Word from "./Word";
import Keyboard from "./Keyboard";

const Game = () => {

    const [word, setWord] = useState("hangman".toUpperCase());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    console.log(wrongGuesses);

    useEffect(() => {
        // fetch("https://random-word-api.herokuapp.com/word").
        //     then(res => res.json()).
        //     then(data => {
        //         const fetchedWord = data[0].toUpperCase();
        //         console.log(fetchedWord);
        //         setWord(fetchedWord);
        //     })
        fetch('https://random-word-api.vercel.app/api?words')
            .then(res => res.json())
            .then(data => {
                const fetchedWord = data[0].toUpperCase();
                console.log(fetchedWord);
                setWord(fetchedWord);
            })
    }, [])

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

    const isGameOver = wrongGuesses >= 6;
    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter));

    return (
        <div className="inner-body">
            <h1>Hangman Game</h1>
            <Word
                word={word}
                guessedLetters={guessedLetters}
            />

            <Keyboard
                handleGuess={handleGuess}
                guessedLetters={guessedLetters}
                isDisabled={isGameOver}
            />

            <div className="result-container">
                <div className="result">
                    {isGameOver && <p>You lost! The word was {word}.</p>}
                    {isGameWon && <p>Congratulations! You've won!</p>}
                    {!(isGameOver || isGameWon) && <p>The number of guesses remaining {6 - wrongGuesses}. </p>}
                    {
                        (isGameOver || isGameWon) &&
                        <button className="btn-play-again" onClick={handleButton}>Play again</button>
                    }
                </div>
                <div className="game-modal">
                    <img src={`hangman-${wrongGuesses}.svg`} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Game;
