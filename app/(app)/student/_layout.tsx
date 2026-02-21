import { Text } from "react-native";
import { Tabs } from "expo-router";
import { COLORS } from "../../../constants/colors";

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.gray[500],
        tabBarStyle: { backgroundColor: COLORS.white },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: () => <TabIcon emoji="🏠" /> }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: () => <TabIcon emoji="🔍" /> }} />
      <Tabs.Screen name="courses" options={{ title: "My Courses", tabBarIcon: () => <TabIcon emoji="📚" /> }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifications", tabBarIcon: () => <TabIcon emoji="🔔" /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: () => <TabIcon emoji="👤" /> }} />
    </Tabs>
  );
}
