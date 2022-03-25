import { configureStore } from "@reduxjs/toolkit";
import quizesReducer from "./reducers/quizReducer";

export const store = configureStore({
  reducer: {
    quizzes: quizesReducer,
  },
});
