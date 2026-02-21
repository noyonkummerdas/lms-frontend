import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Lesson } from "../../types/Lesson";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/lessons`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Lesson"],
  endpoints: (builder) => ({
    getLessons: builder.query<Lesson[], string>({
      query: (courseId) => `?courseId=${courseId}`,
      providesTags: ["Lesson"],
    }),
    getLesson: builder.query<Lesson, string>({
      query: (id) => `/${id}`,
      providesTags: ["Lesson"],
    }),
  }),
});

export const { useGetLessonsQuery, useGetLessonQuery } = lessonApi;
