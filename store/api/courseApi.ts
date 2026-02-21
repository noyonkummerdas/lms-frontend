import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Course } from "../../types/Course";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/courses`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => "/",
      providesTags: ["Course"],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/${id}`,
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery, useCreateCourseMutation } =
  courseApi;
