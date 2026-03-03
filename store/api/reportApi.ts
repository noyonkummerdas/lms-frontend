import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface AdminStats {
    totalRevenue: number;
    totalUsers: number;
    activeCourses: number;
    recentTransactions: any[];
}

export interface InstructorStats {
    grossEarnings: number;
    totalEnrollments: number;
    coursePerformance: any[];
}

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery,
    tagTypes: ["Report"],
    endpoints: (builder) => ({
        getAdminStats: builder.query<AdminStats, void>({
            query: () => "/reports/admin/stats",
            providesTags: ["Report"],
        }),
        getInstructorStats: builder.query<InstructorStats, void>({
            query: () => "/reports/instructor/stats",
            providesTags: ["Report"],
        }),
    }),
});

export const {
    useGetAdminStatsQuery,
    useGetInstructorStatsQuery
} = reportApi;
