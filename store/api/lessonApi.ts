import { createApi } from "@reduxjs/toolkit/query/react";
import { Lesson } from "../../types/Lesson";
import { baseQuery } from "./baseQuery";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery,
  tagTypes: ["Lesson"],
  endpoints: (builder) => ({
    getLessons: builder.query<Lesson[], string>({
      query: (courseId) => `/lessons?courseId=${courseId}`,
      providesTags: ["Lesson"],
    }),
    getLesson: builder.query<Lesson, string>({
      query: (id) => `/lessons/${id}`,
      providesTags: (result, error, id) => [{ type: "Lesson", id }],
    }),
    addLesson: builder.mutation<Lesson, Partial<Lesson>>({
      query: (body) => ({
        url: "/lessons",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lesson"],
    }),
    updateLesson: builder.mutation<Lesson, { id: string; data: Partial<Lesson> }>({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Lesson", { type: "Lesson", id }],
    }),
    deleteLesson: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation
} = lessonApi;
