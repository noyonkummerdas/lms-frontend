import { createApi } from "@reduxjs/toolkit/query/react";
import { Certificate } from "../../types/Certificate";
import { baseQuery } from "./baseQuery";

export const certificateApi = createApi({
  reducerPath: "certificateApi",
  baseQuery,
  tagTypes: ["Certificate"],
  endpoints: (builder) => ({
    generateCertificate: builder.mutation<Certificate, string>({
      query: (courseId) => ({
        url: `/certificates/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["Certificate"],
    }),
    getMyCertificates: builder.query<Certificate[], void>({
      query: () => "/certificates/my",
      providesTags: ["Certificate"],
    }),
  }),
});

export const {
  useGenerateCertificateMutation,
  useGetMyCertificatesQuery
} = certificateApi;
