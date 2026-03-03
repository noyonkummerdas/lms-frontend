import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DiscussionThread {
    id: string;
    courseId: string;
    title: string;
    content: string;
    author: { name: string; avatar?: string };
    replies: any[];
    createdAt: string;
}

export const discussionApi = createApi({
    reducerPath: "discussionApi",
    baseQuery,
    tagTypes: ["Discussion"],
    endpoints: (builder) => ({
        getDiscussions: builder.query<DiscussionThread[], { courseId: string }>({
            query: (params) => ({
                url: "/discussions",
                params,
            }),
            providesTags: ["Discussion"],
        }),
        postDiscussion: builder.mutation<DiscussionThread, { courseId: string; title: string; content: string }>({
            query: (body) => ({
                url: "/discussions",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Discussion"],
        }),
        replyToDiscussion: builder.mutation<void, { id: string; content: string }>({
            query: ({ id, content }) => ({
                url: `/discussions/${id}/reply`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: ["Discussion"],
        }),
    }),
});

export const {
    useGetDiscussionsQuery,
    usePostDiscussionMutation,
    useReplyToDiscussionMutation
} = discussionApi;
