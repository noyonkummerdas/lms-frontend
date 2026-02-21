import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useMeQuery } from "../store/api/authApi";

export const useAuth = () => {
  const { user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: currentUser } = useMeQuery(undefined, {
    skip: !token,
  });

  return {
    user: currentUser ?? user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
  };
};
