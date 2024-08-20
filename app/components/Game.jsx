"use client";

import React, { useEffect, useState, useRef } from 'react';
import Word from './Word';
import Keyboard from './Keyboard';
import Confetti from 'react-confetti'
import Image from 'next/image';

const Game = () => {
    const [word, setWord] = useState("HANGMAN");
    const [hint, setHint] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuessedLetters, setWrongGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const fetchedRef = useRef(false);

    const fetchWord = async () => {
        try {
            const response = await fetch('/api/fetch-word');
            if (response.ok) {
                const data = await response.json();
                setWord(data.word.toUpperCase());
                setHint(data.hint);
                console.log(data.word);
            } else {
                console.error('Failed to fetch word');
            }
        } catch (error) {
            console.error('Error fetching word:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        fetchWord();
    }, []);

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter) || wrongGuessedLetters.includes(letter)) return;

        if (word.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
        } else {
            setWrongGuessedLetters([...wrongGuessedLetters, letter]);
            setWrongGuesses(prev => prev + 1);
        }
    };

    const resetButton = () => {
        // Reset state variables
        setWord("HANGMAN");
        setHint("");
        setGuessedLetters([]);
        setWrongGuessedLetters([]);
        setWrongGuesses(0);

        // Refetch a new word if needed
        fetchWord();
    };

    const isGameOver = wrongGuesses >= 6;
    const isGameWon = word.split("").every(letter => guessedLetters.includes(letter));

    return (
        <div className="inner-body">
            <h1>Hangman Game</h1>

            {isLoading ? (
                <div className="loading-bar word-container">
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    <Word word={word} guessedLetters={guessedLetters} />
                    <p>Hint: {hint}</p>
                </div>
            )}

            <Keyboard
                handleGuess={handleGuess}
                guessedLetters={guessedLetters}
                wrongGuessedLetters={wrongGuessedLetters}
                isDisabled={isGameOver}
            />

            <div className="result-container">
                <div className="result">
                    {isGameOver && <p>You lost! The word was {word}.</p>}
                    {isGameWon && <p>Congratulations! You've won!</p>}
                    {!(isGameOver || isGameWon) && <p>The number of guesses remaining {6 - wrongGuesses}. </p>}
                    {
                        (isGameOver || isGameWon) &&
                        <button className="btn-play-again" onClick={resetButton}>Play again</button>
                    }
                </div>
                <div className="game-modal">
                <Image src={`/hangman-${wrongGuesses}.svg`} alt="" width={300} height={300} />
                </div>
            </div>
            {isGameWon && (
                <Confetti
                    width={document.body.scrollWidth}
                    height={document.body.scrollHeight}
                />
            )}
        </div>
    );
};

export default Game;