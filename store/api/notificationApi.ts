import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface NotificationAlert {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery,
    tagTypes: ["Notification"],
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationAlert[], void>({
            query: () => "/notifications",
            providesTags: ["Notification"],
        }),
        getUnreadCount: builder.query<{ count: number }, void>({
            query: () => "/notifications/unread-count",
            providesTags: ["Notification"],
        }),
        markAsRead: builder.mutation<void, string>({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
        markAllRead: builder.mutation<void, void>({
            query: () => ({
                url: "/notifications/read-all",
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useGetUnreadCountQuery,
    useMarkAsReadMutation,
    useMarkAllReadMutation
} = notificationApi;
