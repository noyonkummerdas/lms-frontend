import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../../types/Assignment";

interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  currentAssignment: null,
  isLoading: false,
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    setCurrentAssignment: (state, action: PayloadAction<Assignment | null>) => {
      state.currentAssignment = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAssignments, setCurrentAssignment, setLoading, setError } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;
