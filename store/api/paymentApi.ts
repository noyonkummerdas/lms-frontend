import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Payment } from "../../types/Payment";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/payments`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], string>({
      query: (userId) => `?userId=${userId}`,
      providesTags: ["Payment"],
    }),
    createPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useGetPaymentsQuery, useCreatePaymentMutation } = paymentApi;
