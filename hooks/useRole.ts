import { useAuth } from "./useAuth";

export const useRole = () => {
  const { user } = useAuth();

  return {
    role: user?.role,
    isStudent: user?.role === "student",
    isInstructor: user?.role === "instructor",
    isAdmin: user?.role === "admin",
  };
};
