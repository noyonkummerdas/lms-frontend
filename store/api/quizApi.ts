import { createApi } from "@reduxjs/toolkit/query/react";
import { Quiz, QuizResult } from "../../types/Quiz";
import { baseQuery } from "./baseQuery";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery,
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (body) => ({
        url: "/quizzes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitQuiz: builder.mutation<QuizResult, { id: string; answers: any[] }>({
      query: ({ id, answers }) => ({
        url: `/quizzes/${id}/submit`,
        method: "POST",
        body: { answers },
      }),
      invalidatesTags: ["Quiz"],
    }),
    getMyQuizResults: builder.query<QuizResult[], void>({
      query: () => "/quizzes/my-results",
      providesTags: ["Quiz"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useSubmitQuizMutation,
  useGetMyQuizResultsQuery
} = quizApi;
