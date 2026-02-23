import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Sidebar } from "../../../components";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { logout } from "../../../store/slices/authSlice";
import { COLORS } from "../../../constants/colors";

const ADMIN_MENU = [
  { label: "Admin Dashboard", href: "/admin", icon: "grid-outline" as keyof typeof Ionicons.glyphMap },
  { label: "User Management", href: "/admin/users", icon: "people-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Role Management", href: "/admin/roles", icon: "shield-checkmark-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Course Management", href: "/admin/courses", icon: "book-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Course Approval", href: "/admin/approval", icon: "checkmark-circle-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Category Management", href: "/admin/categories", icon: "list-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Payments & Revenue", href: "/admin/payments", icon: "cash-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Reports & Analytics", href: "/admin/reports", icon: "bar-chart-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Platform Settings", href: "/admin/settings", icon: "settings-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Profile", href: "/admin/profile", icon: "person-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Logout", href: "__logout__", icon: "log-out-outline" as keyof typeof Ionicons.glyphMap },
];

export default function AdminLayout() {
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

  const menuItems = ADMIN_MENU.map((m) => ({
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
