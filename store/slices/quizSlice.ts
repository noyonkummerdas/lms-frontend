import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../../types/Quiz";

interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  isLoading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setQuizzes, setCurrentQuiz, setLoading, setError } =
  quizSlice.actions;
export default quizSlice.reducer;
