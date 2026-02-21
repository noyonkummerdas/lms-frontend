import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../types/Lesson";

interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
    setCurrentLesson: (state, action: PayloadAction<Lesson | null>) => {
      state.currentLesson = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLessons, setCurrentLesson, setLoading, setError } =
  lessonSlice.actions;
export default lessonSlice.reducer;
