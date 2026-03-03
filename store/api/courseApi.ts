import { createApi } from "@reduxjs/toolkit/query/react";
import { Course } from "../../types/Course";
import { baseQuery } from "./baseQuery";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery,
  tagTypes: ["Course", "User"],
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], { keyword?: string; category?: string; pageNumber?: number } | void>({
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
    getInstructorStats: builder.query<{ totalStudents: number; totalCourses: number; earnings: number }, void>({
      query: () => "/courses/instructor/stats",
      providesTags: ["Course"],
    }),
    getAdminCourses: builder.query<Course[], void>({
      query: () => "/courses/admin",
      providesTags: ["Course"],
    }),
    getAdminStats: builder.query<{ totalUsers: number; totalCourses: number; revenue: number }, void>({
      query: () => "/courses/admin/stats",
      providesTags: ["Course", "User"],
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
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetInstructorCoursesQuery,
  useGetAdminCoursesQuery,
  useGetAdminStatsQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation
} = courseApi;
