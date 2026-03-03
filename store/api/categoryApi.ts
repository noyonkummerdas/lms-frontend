import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface Category {
    _id: string;
    name: string;
    description?: string;
    image?: string;
    courseCount?: number;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
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
        updateCategory: builder.mutation<Category, { id: string; data: Partial<Category> }>({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
