import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    isLoaded: true,
  },
  reducers: {
    fetchQuizzes: (state, { payload }) => {
      state.quizzes = payload;
      state.isLoaded = false;
    },
  },
});

export const { fetchQuizzes } = quizSlice.actions;
export const getQuizzes = (state) => state.quizzes;
export default quizSlice.reducer;
