import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Assignment } from "../../types/Assignment";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/assignments`,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Assignment"],
  endpoints: (builder) => ({
    getAssignments: builder.query<Assignment[], string>({
      query: (courseId) => `?courseId=${courseId}`,
      providesTags: ["Assignment"],
    }),
    getAssignment: builder.query<Assignment, string>({
      query: (id) => `/${id}`,
      providesTags: ["Assignment"],
    }),
  }),
});

export const { useGetAssignmentsQuery, useGetAssignmentQuery } =
  assignmentApi;
