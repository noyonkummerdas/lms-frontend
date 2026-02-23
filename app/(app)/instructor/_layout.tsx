import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Sidebar } from "../../../components";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { logout } from "../../../store/slices/authSlice";
import { COLORS } from "../../../constants/colors";

const INSTRUCTOR_MENU = [
  { label: "Dashboard", href: "/instructor", icon: "grid-outline" as keyof typeof Ionicons.glyphMap },
  { label: "My Courses", href: "/instructor/my-courses", icon: "book-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Create Course", href: "/instructor/create-course", icon: "add-circle-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Students", href: "/instructor/students", icon: "people-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Earnings", href: "/instructor/earnings", icon: "wallet-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Profile", href: "/instructor/profile", icon: "person-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Logout", href: "__logout__", icon: "log-out-outline" as keyof typeof Ionicons.glyphMap },
];

export default function InstructorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuPress = (href: string) => {
    setSidebarOpen(false);
    if (href === "__logout__") {
      dispatch(logout());
      router.replace("/auth/login");
      return;
    }
    router.push(href as any);
  };

  const menuItems = INSTRUCTOR_MENU.map((m) => ({
    label: m.label,
    icon: m.icon,
    onPress: () => handleMenuPress(m.href),
  }));

  return (
    <SidebarProvider
      value={{
        open: () => setSidebarOpen(true),
        close: () => setSidebarOpen(false),
        toggle: () => setSidebarOpen((v) => !v),
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.light },
        }}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} />
    </SidebarProvider>
  );
}
