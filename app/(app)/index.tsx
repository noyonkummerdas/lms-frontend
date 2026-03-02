import { Redirect } from "expo-router";
import { useAuth } from "../../hooks";

export default function AppIndex() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Redirect href="/auth/login" />;
  if (!user) return null;

  console.log(`[AppIndex] User Role: ${user.role}, Name: ${user.name}`);

  if (user.role === "admin") {
    console.log("[AppIndex] Redirecting to /admin");
    return <Redirect href={"/admin" as any} />;
  } else if (user.role === "instructor") {
    console.log("[AppIndex] Redirecting to /instructor");
    return <Redirect href={"/instructor" as any} />;
  } else {
    console.log("[AppIndex] Redirecting to /student");
    return <Redirect href={"/student" as any} />;
  }
}
