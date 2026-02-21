import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { Sidebar } from "../../../components";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { logout } from "../../../store/slices/authSlice";
import { COLORS } from "../../../constants/colors";

const ADMIN_MENU = [
  { label: "Admin Dashboard", href: "/admin" },
  { label: "User Management", href: "/admin/users" },
  { label: "Role Management", href: "/admin/roles" },
  { label: "Course Management", href: "/admin/courses" },
  { label: "Course Approval", href: "/admin/approval" },
  { label: "Category Management", href: "/admin/categories" },
  { label: "Payments & Revenue", href: "/admin/payments" },
  { label: "Reports & Analytics", href: "/admin/reports" },
  { label: "Platform Settings", href: "/admin/settings" },
  { label: "Profile", href: "/admin/profile" },
  { label: "Logout", href: "__logout__" },
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
