import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/User";

/** Mock auth - no backend. Uses queryFn to return demo data. */
const createMockUser = (payload: {
  email: string;
  name?: string;
  role?: User["role"];
}): User => ({
  id: `mock-${Date.now()}`,
  name: payload.name || payload.email.split("@")[0],
  email: payload.email,
  role: payload.role || "student",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: User }, { email: string; password: string }>({
      queryFn: async (credentials) => {
        await new Promise((r) => setTimeout(r, 400));
        const emailLower = credentials.email.toLowerCase();
        const role =
          emailLower === "admin@test.com" || emailLower === "admin"
            ? ("admin" as const)
            : emailLower === "teacher@test.com" || emailLower === "teacher"
              ? ("instructor" as const)
              : ("student" as const);

        let name = credentials.email.split("@")[0];
        // Capitalize for better UX
        name = name.charAt(0).toUpperCase() + name.slice(1);

        const user = createMockUser({
          email: credentials.email.includes("@") ? credentials.email : `${credentials.email}@test.com`,
          name,
          role,
        });
        return {
          data: { token: `mock-token-${Date.now()}`, user },
        };
      },
    }),
    register: builder.mutation<
      { token: string; user: User },
      { name: string; email: string; password: string; role: "student" | "instructor" }
    >({
      queryFn: async (userData) => {
        await new Promise((r) => setTimeout(r, 500));
        const user = createMockUser({
          email: userData.email,
          name: userData.name.trim(),
          role: userData.role,
        });
        return {
          data: { token: `mock-token-${Date.now()}`, user },
        };
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        return { data: undefined };
      },
    }),
    me: builder.query<User, void>({
      queryFn: (_arg, { getState }) => {
        const state = getState() as { auth: { user: User | null } };
        const user = state.auth.user;
        if (!user) {
          return { error: { status: 401, data: "Not authenticated" } };
        }
        return { data: user };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
