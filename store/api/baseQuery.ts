import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

// export const API_BASE_URL = "http://192.168.0.105:5000/api" || ;
export const API_BASE_URL = "https://lms-backend-seven-mauve.vercel.app/api";

export const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
            console.log("[API_REQUEST] Using Token:", token);
        }
        return headers;
    },
});
