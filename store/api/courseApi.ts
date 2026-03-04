import { createApi } from "@reduxjs/toolkit/query/react";
import { Course } from "../../types/Course";
import { baseQuery } from "./baseQuery";

export interface PaginatedCourses {
  courses: Course[];
  page: number;
  pages: number;
  count: number;
}

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery,
  tagTypes: ["Course", "User"],
  endpoints: (builder) => ({
    getCourses: builder.query<PaginatedCourses, { keyword?: string; category?: string; pageNumber?: number } | void>({
      query: (params) => ({
        url: "/courses",
        params: params || {},
      }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    getInstructorCourses: builder.query<Course[], void>({
      query: () => "/courses/instructor",
      providesTags: ["Course"],
    }),
    getAdminCourses: builder.query<Course[], void>({
      query: () => "/courses/admin",
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation<Course, { id: string; data: Partial<Course> }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Course", { type: "Course", id }],
    }),
    deleteCourse: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetInstructorCoursesQuery,
  useGetAdminCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation
} = courseApi;
