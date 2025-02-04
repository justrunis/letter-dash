import { useState } from "react";

const targetWord = "sugar"; // fixed word for now

export default function useWordleLogic() {
  const maxAttempts = 6;
  const wordLength = targetWord.length;
  const [isValidWord, setIsValidWord] = useState(true);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  // Evaluate a guess into letter statuses: "correct", "present", or "absent"
  const evaluateGuess = (guess) => {
    const result = Array(wordLength).fill("absent");
    const targetArr = targetWord.split("");
    const guessArr = guess.split("");

    guessArr.forEach((letter, i) => {
      if (letter === targetArr[i]) {
        result[i] = "correct";
        targetArr[i] = null; // remove to avoid duplicate matching
      }
    });
    guessArr.forEach((letter, i) => {
      if (result[i] !== "correct" && targetArr.includes(letter)) {
        result[i] = "present";
        targetArr[targetArr.indexOf(letter)] = null;
      }
    });
    return result;
  };

  const addLetter = (letter) => {
    if (currentGuess.length < wordLength) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const deleteLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const submitGuess = async () => {
    if (currentGuess.length !== wordLength) return;
    const isValid = await checkWordValidity(currentGuess);
    setIsValidWord(isValid);
    if (!isValid) return;
    const evaluation = evaluateGuess(currentGuess);
    setGuesses((prev) => [...prev, { word: currentGuess, evaluation }]);
    setCurrentGuess("");
  };

  const reset = () => {
    setCurrentGuess("");
    setGuesses([]);
  };

  const resetValidity = () => {
    setIsValidWord(true);
    setCurrentGuess("");
  };

  const checkWordValidity = async (word) => {
    const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await fetch(URL);
    const data = await response.json();
    return !data?.message;
  };

  const isGameOver =
    guesses.some((guess) => guess.word === targetWord) ||
    guesses.length >= maxAttempts;

  return {
    guesses,
    currentGuess,
    isValidWord,
    addLetter,
    deleteLetter,
    submitGuess,
    reset,
    resetValidity,
    isGameOver,
    targetWord,
    maxAttempts,
    wordLength,
  };
}
