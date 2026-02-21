import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Certificate } from "../../types/Certificate";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/certificates`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Certificate"],
  endpoints: (builder) => ({
    getCertificates: builder.query<Certificate[], string>({
      query: (userId) => `?userId=${userId}`,
      providesTags: ["Certificate"],
    }),
  }),
});

export const { useGetCertificatesQuery } = certificateApi;
