import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Quiz } from "../../types/Quiz";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/quizzes`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], string>({
      query: (courseId) => `?courseId=${courseId}`,
      providesTags: ["Quiz"],
    }),
    getQuiz: builder.query<Quiz, string>({
      query: (id) => `/${id}`,
      providesTags: ["Quiz"],
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizQuery } = quizApi;
