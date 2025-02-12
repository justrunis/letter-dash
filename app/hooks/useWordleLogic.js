import { useState, useEffect } from "react";
import { Toast } from "toastify-react-native";
import { MAX_TRIES, WORD_LENGTH } from "../constants/constants";
import { useSelector, useDispatch } from "react-redux";

export default function useWordleLogic(dailyWord) {
  const maxAttempts = MAX_TRIES;
  const [targetWord, setTargetWord] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [keyEvaluations, setKeyEvaluations] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);

  const token = useSelector((state) => state.auth.userToken);

  const updateKeyEvaluations = (guess, evaluation) => {
    setKeyEvaluations((prevEvaluations) => {
      const newEvaluations = { ...prevEvaluations };
      guess.split("").forEach((letter, index) => {
        const evalStatus = evaluation[index];
        if (
          evalStatus === "correct" ||
          (evalStatus === "present" && newEvaluations[letter] !== "correct")
        ) {
          newEvaluations[letter] = evalStatus;
        } else if (!newEvaluations[letter]) {
          newEvaluations[letter] = "absent";
        }
      });
      return newEvaluations;
    });
  };

  const getDailyWord = async () => {
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL + "/daily-challenge";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        Toast.error(data.message);
        return;
      }
      const data = await response.json();
      console.log("The daily word is: " + data.word);
      setTargetWord(data.word);
      setWordLength(data.word.length);
    } catch (error) {
      Toast.error("Failed to fetch the daily word.");
    }
  };

  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=1&length=${WORD_LENGTH}`
      );
      const data = await response.json();
      console.log("The word is: " + data);
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
    if (dailyWord) {
      getDailyWord();
      getUsersTodayGuesses();
    } else {
      fetchRandomWord();
    }
    setStartTime(Date.now());
  }, []);

  const evaluateGuess = (guess) => {
    const result = Array(wordLength).fill("absent");
    const targetArr = targetWord.split("");
    const guessArr = guess.split("");

    guessArr.forEach((letter, i) => {
      if (letter === targetArr[i]) {
        result[i] = "correct";
        targetArr[i] = null; // mark as used
      }
    });

    guessArr.forEach((letter, i) => {
      if (result[i] !== "correct" && targetArr.includes(letter)) {
        result[i] = "present";
        targetArr[targetArr.indexOf(letter)] = null;
      }
    });

    setKeyEvaluations((prev) => {
      const newEvaluations = { ...prev };
      guessArr.forEach((letter, i) => {
        if (newEvaluations[letter] !== "correct") {
          newEvaluations[letter] = result[i];
        }
      });
      return newEvaluations;
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
    setKeyEvaluations({});
    setEndTime(null);
    setStartTime(Date.now());
    setIsGameOver(false);
    fetchRandomWord();
  };

  const postGuess = async (guess) => {
    const URL = process.env.EXPO_PUBLIC_API_URL + "/guess";
    console.log(URL);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ word: guess }),
    });
    console.log(await response.json());
    if (!response.ok) {
      const data = await response.json();
      Toast.error(data.message);
      return;
    }
    const data = await response.json();
    console.log(data);
  };

  const getUsersTodayGuesses = async () => {
    const URL = process.env.EXPO_PUBLIC_API_URL + "/guess";
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        Toast.error(data.message);
        return;
      }

      const data = await response.json();
      console.log(data);

      const formattedGuesses = data.guesses.map((guess) => ({
        word: guess.word,
        evaluation: evaluateGuess(guess.word),
      }));

      setGuesses(formattedGuesses);
    } catch (error) {
      console.error("Error fetching user's guesses:", error);
      Toast.error("Failed to fetch user's guesses.");
    }
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

    if (dailyWord) {
      postGuess(currentGuess);
    }

    const evaluation = evaluateGuess(currentGuess);
    setGuesses((prev) => [...prev, { word: currentGuess, evaluation }]);
    updateKeyEvaluations(currentGuess, evaluation);
    if (currentGuess === targetWord && !endTime) {
      setIsGameOver(true);
      setEndTime(Date.now());
    }
    if (guesses.length === maxAttempts - 1) {
      setIsGameOver(true);
      setEndTime(Date.now());
    }
    setCurrentGuess("");
  };

  const gameWon = guesses.some((guess) => guess.word === targetWord);
  const attemptsCount = gameWon ? guesses.length : null;
  const timeTaken = endTime ? (endTime - startTime) / 1000 : null; // in seconds

  // Compute score: base 1000 points minus penalties (100 per attempt and 1 per second)
  const rawScore =
    gameWon && attemptsCount && timeTaken
      ? 1000 - attemptsCount * 100 - timeTaken * 1
      : 0;
  const score = rawScore < 0 ? 0 : Math.floor(rawScore);

  return {
    guesses, // all guesses
    currentGuess, // the current guess
    addLetter,
    deleteLetter,
    submitGuess,
    restart,
    fetchRandomWord,
    isGameOver, // whether the game is over
    targetWord, // the target word
    maxAttempts, // maximum number of attempts
    wordLength, // length of the target word
    attemptsCount, // number of attempts when game is won
    timeTaken, // time taken in seconds when game is won
    score, // computed score based on attempts and speed
    keyEvaluations,
  };
}
