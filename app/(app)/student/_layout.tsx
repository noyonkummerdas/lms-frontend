import { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Sidebar } from "../../../components";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { logout } from "../../../store/slices/authSlice";
import { COLORS } from "../../../constants/colors";

const SIDEBAR_MENU = [
  { label: "Dashboard", href: "/student", icon: "grid-outline" as keyof typeof Ionicons.glyphMap },
  { label: "My Certificates", href: "/student/certificates", icon: "ribbon-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Edit Profile", href: "/student/edit-profile", icon: "person-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Platform Settings", href: "settings", icon: "settings-outline" as keyof typeof Ionicons.glyphMap },
  { label: "Logout", href: "__logout__", icon: "log-out-outline" as keyof typeof Ionicons.glyphMap },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuPress = (href: string) => {
    setSidebarOpen(false);
    if (href === "__logout__") {
      dispatch(logout());
      router.replace("/auth/login");
      return;
    }
    if (href.startsWith("/")) {
      router.push(href as any);
    }
  };

  const menuItems = SIDEBAR_MENU.map((m) => ({
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.secondary,
          tabBarInactiveTintColor: COLORS.gray[400],
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.gray[100],
            height: 65 + (insets.bottom > 0 ? insets.bottom - 12 : 0),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
            paddingTop: 10,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            marginBottom: insets.bottom > 0 ? 0 : 4,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size }) => <Ionicons name="search" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="courses"
          options={{
            title: "My Labs",
            tabBarIcon: ({ color, size }) => <Ionicons name="book" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Activity",
            tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={24} color={color} />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={24} color={color} />
          }}
        />

        {/* Hidden Screens - Using href: null to completely remove from Tab Bar layout */}
        <Tabs.Screen
          name="edit-profile"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="certificates"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} />
    </SidebarProvider>
  );
}
