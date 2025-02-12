import { createSlice } from "@reduxjs/toolkit";

const dailyGuessSlice = createSlice({
  name: "dailyGuess",
  initialState: {
    dailyGuesses: [],
  },
  reducers: {
    addGuess: (state, action) => {
      state.dailyGuesses.push(action.payload);
    },
    resetDailyGuesses: (state) => {
      state.dailyGuesses = [];
    },
  },
});

export const { addGuess, resetDailyGuesses } = dailyGuessSlice.actions;
export default dailyGuessSlice.reducer;
