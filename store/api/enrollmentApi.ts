import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Enrollment } from "../../types/Enrollment";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/enrollments`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Enrollment"],
  endpoints: (builder) => ({
    getEnrollments: builder.query<Enrollment[], string>({
      query: (userId) => `?userId=${userId}`,
      providesTags: ["Enrollment"],
    }),
    enrollCourse: builder.mutation<Enrollment, { userId: string; courseId: string }>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Enrollment"],
    }),
  }),
});

export const { useGetEnrollmentsQuery, useEnrollCourseMutation } =
  enrollmentApi;
