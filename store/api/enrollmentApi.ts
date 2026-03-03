import { createApi } from "@reduxjs/toolkit/query/react";
import { Enrollment } from "../../types/Enrollment";
import { Course } from "../../types/Course";
import { baseQuery } from "./baseQuery";

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery,
  tagTypes: ["Enrollment"],
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation<Enrollment, { courseId: string }>({
      query: (body) => ({
        url: "/enroll",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollment"],
    }),
    getMyEnrolledCourses: builder.query<Course[], void>({
      query: () => "/enroll/my-courses",
      providesTags: ["Enrollment"],
    }),
    getLearningProgress: builder.query<{ progress: number }, void>({
      query: () => "/enroll/progress",
      providesTags: ["Enrollment"],
    }),
    getInstructorStudents: builder.query<any[], void>({
      query: () => "/enroll/instructor/students",
      providesTags: ["Enrollment"],
    }),
    markLessonCompleted: builder.mutation<void, { courseId: string; lessonId: string }>({
      query: ({ courseId, lessonId }) => ({
        url: `/enroll/${courseId}/lesson/${lessonId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
});

export const {
  useEnrollInCourseMutation,
  useGetMyEnrolledCoursesQuery,
  useGetLearningProgressQuery,
  useMarkLessonCompletedMutation,
  useGetInstructorStudentsQuery
} = enrollmentApi;
