// /src/hooks/useWordleLogic.js
import { useState, useEffect } from "react";
import { Toast } from "toastify-react-native";
import { MAX_TRIES, WORD_LENGTH } from "../constants/constants";

export default function useWordleLogic() {
  const maxAttempts = MAX_TRIES;
  const [targetWord, setTargetWord] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [guesses, setGuesses] = useState([]); // each guess: { word, evaluation }
  const [currentGuess, setCurrentGuess] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);

  // Function to fetch a random word from the API
  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=1&length=${WORD_LENGTH}`
      );
      const data = await response.json();
      console.log(data + ":DATA");
      if (data && data.length > 0) {
        const word = data[0].toLowerCase();
        setTargetWord(word);
        setWordLength(word.length);
      }
    } catch (error) {
      console.error("Error fetching random word:", error);
      // Fallback word in case of an error
      setTargetWord("donut");
      setWordLength("donut".length);
    }
  };

  // Fetch a random word on mount
  useEffect(() => {
    fetchRandomWord();
    setStartTime(Date.now());
  }, []);

  const evaluateGuess = (guess) => {
    const result = Array(wordLength).fill("absent");
    const targetArr = targetWord.split("");
    const guessArr = guess.split("");

    // First pass: correct letters (right letter, right position)
    guessArr.forEach((letter, i) => {
      if (letter === targetArr[i]) {
        result[i] = "correct";
        targetArr[i] = null; // mark as used
      }
    });
    // Second pass: present letters (right letter, wrong position)
    guessArr.forEach((letter, i) => {
      if (result[i] !== "correct" && targetArr.includes(letter)) {
        result[i] = "present";
        targetArr[targetArr.indexOf(letter)] = null;
      }
    });
    return result;
  };

  const checkWordValidity = async (word) => {
    const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data?.message) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const addLetter = (letter) => {
    if (currentGuess.length < wordLength) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const deleteLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const restart = () => {
    setGuesses([]);
    setCurrentGuess("");
    setEndTime(null);
    setStartTime(Date.now());
    fetchRandomWord();
  };

  const submitGuess = async () => {
    if (currentGuess.length !== wordLength) {
      Toast.error("Please enter a valid word.");
      return;
    }

    const isValid = await checkWordValidity(currentGuess);
    if (!isValid) {
      Toast.error(`The word ${currentGuess} doesn't exist.`);
      setCurrentGuess("");
      return;
    }

    const evaluation = evaluateGuess(currentGuess);
    setGuesses((prev) => [...prev, { word: currentGuess, evaluation }]);
    // Record end time when the target word is guessed
    if (currentGuess === targetWord && !endTime) {
      setEndTime(Date.now());
    }
    setCurrentGuess("");
  };

  const isGameOver =
    guesses.some((guess) => guess.word === targetWord) ||
    guesses.length >= maxAttempts;

  // Compute game metrics if the game is won
  const gameWon = guesses.some((guess) => guess.word === targetWord);
  const attemptsCount = gameWon ? guesses.length : null;
  const timeTaken = endTime ? (endTime - startTime) / 1000 : null; // in seconds

  // Compute score: base 1000 points minus penalties (100 per attempt and 10 per second)
  const rawScore =
    gameWon && attemptsCount && timeTaken
      ? 1000 - attemptsCount * 100 - timeTaken * 10
      : 0;
  const score = rawScore < 0 ? 0 : Math.floor(rawScore);

  return {
    guesses, // all guesses
    currentGuess, // the current guess
    addLetter,
    deleteLetter,
    submitGuess,
    restart,
    isGameOver, // whether the game is over
    targetWord, // the target word
    maxAttempts, // maximum number of attempts
    wordLength, // length of the target word
    attemptsCount, // number of attempts when game is won
    timeTaken, // time taken in seconds when game is won
    score, // computed score based on attempts and speed
  };
}
