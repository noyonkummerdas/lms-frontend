import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const useAuth = () => {
  const { user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
  };
};
