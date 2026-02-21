import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types/Course";

interface CourseState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCourses, setSelectedCourse, setLoading, setError } =
  courseSlice.actions;
export default courseSlice.reducer;
