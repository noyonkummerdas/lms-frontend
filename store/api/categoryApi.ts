import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface Category {
    _id: string;
    name: string;
    description?: string;
}

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/categories",
            providesTags: ["Category"],
        }),
        createCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
