/**
 * Mock auth utilities for demo mode (no backend).
 * Auth flows are handled by store/api/authApi.ts using fakeBaseQuery.
 * This module exists to satisfy any imports and for future mock extensions.
 */

import type { User } from "../types/User";

export function createMockUser(payload: {
  email: string;
  name?: string;
  role?: User["role"];
}): User {
  return {
    id: `mock-${Date.now()}`,
    name: payload.name ?? payload.email.split("@")[0],
    email: payload.email,
    role: payload.role ?? "student",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
