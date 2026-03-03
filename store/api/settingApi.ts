import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface SystemSetting {
    _id?: string;
    siteName: string;
    siteEmail: string;
    systemEmails: boolean;
    pushNotifications: boolean;
    maintenanceMode: boolean;
    currency: string;
    currencySymbol: string;
    siteLanguage: string;
}

export const settingApi = createApi({
    reducerPath: "settingApi",
    baseQuery,
    tagTypes: ["Setting"],
    endpoints: (builder) => ({
        getSettings: builder.query<SystemSetting, void>({
            query: () => "/settings",
            providesTags: ["Setting"],
        }),
        updateSettings: builder.mutation<SystemSetting, Partial<SystemSetting>>({
            query: (data) => ({
                url: "/settings",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Setting"],
        }),
    }),
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsQuery, // Wait, it's mutation.
    useUpdateSettingsMutation
} = settingApi;
