import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enrollment } from "../../types/Enrollment";

interface EnrollmentState {
  enrollments: Enrollment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  isLoading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setEnrollments, setLoading, setError } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
