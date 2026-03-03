import { createApi } from "@reduxjs/toolkit/query/react";
import { Payment, Transaction } from "../../types/Payment";
import { baseQuery } from "./baseQuery";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    initiateCheckout: builder.mutation<{ checkoutUrl: string }, { courseId: string; method: string }>({
      query: (body) => ({
        url: "/payments/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
    getPaymentHistory: builder.query<Transaction[], void>({
      query: () => "/payments/history",
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  useInitiateCheckoutMutation,
  useGetPaymentHistoryQuery
} = paymentApi;
