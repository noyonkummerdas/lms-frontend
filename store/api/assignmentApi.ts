import { createApi } from "@reduxjs/toolkit/query/react";
import { Assignment, AssignmentSubmission } from "../../types/Assignment";
import { baseQuery } from "./baseQuery";

export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  baseQuery,
  tagTypes: ["Assignment"],
  endpoints: (builder) => ({
    createAssignment: builder.mutation<Assignment, Partial<Assignment>>({
      query: (body) => ({
        url: "/assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),
    submitAssignment: builder.mutation<AssignmentSubmission, { id: string; fileUrl: string }>({
      query: ({ id, fileUrl }) => ({
        url: `/assignments/${id}/submit`,
        method: "POST",
        body: { fileUrl },
      }),
      invalidatesTags: ["Assignment"],
    }),
    gradeAssignment: builder.mutation<AssignmentSubmission, { id: string; subId: string; grade: number; feedback: string }>({
      query: ({ id, subId, grade, feedback }) => ({
        url: `/assignments/${id}/grade/${subId}`,
        method: "PUT",
        body: { grade, feedback },
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useSubmitAssignmentMutation,
  useGradeAssignmentMutation
} = assignmentApi;
