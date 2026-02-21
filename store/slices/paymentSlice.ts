import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payment } from "../../types/Payment";

interface PaymentState {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPayments, setLoading, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
