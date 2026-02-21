import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Certificate } from "../../types/Certificate";

interface CertificateState {
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  isLoading: false,
  error: null,
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    setCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificates = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCertificates, setLoading, setError } =
  certificateSlice.actions;
export default certificateSlice.reducer;
