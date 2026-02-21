import { Redirect } from "expo-router";
import { useAuth } from "../../hooks";

export default function AppIndex() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  switch (user?.role) {
    case "admin":
      return <Redirect href={"/admin" as any} />;
    case "instructor":
      return <Redirect href={"/instructor" as any} />;
    case "student":
    default:
      return <Redirect href={"/student" as any} />;
  }
}
