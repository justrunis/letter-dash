import DailyChallenge from "../models/dailyChallenge.js";

export async function createDailyChallenges() {
  try {
    const URL = "https://random-word-api.vercel.app/api?words=30&length=5";
    const response = await fetch(URL);
    const words = await response.json();

    if (!Array.isArray(words) || words.length !== 30) {
      throw new Error("Failed to fetch 30 words.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 30; i++) {
      const challengeDate = new Date(today);
      challengeDate.setDate(today.getDate() + i);

      const existingChallenge = await DailyChallenge.findOne({
        date: challengeDate,
      });
      if (existingChallenge) {
        console.log(
          `Daily challenge for ${
            challengeDate.toISOString().split("T")[0]
          } already exists.`
        );
        console.log("The word is: " + existingChallenge.word);
        continue;
      }

      const dailyWord = words[i - 1].toLowerCase();
      const dailyChallenge = new DailyChallenge({
        date: challengeDate,
        word: dailyWord,
      });
      await dailyChallenge.save();

      console.log(
        `The daily word for ${
          challengeDate.toISOString().split("T")[0]
        } is: ${dailyWord}`
      );
    }
  } catch (error) {
    console.error("Error creating daily challenges: ", error);
  }
}
