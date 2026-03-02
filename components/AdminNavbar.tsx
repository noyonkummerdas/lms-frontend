import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSidebar } from "../contexts/SidebarContext";

interface AdminNavbarProps {
  title: string;
}

export default function AdminNavbar({ title }: AdminNavbarProps) {
  const sidebar = useSidebar();

  return (
    <View className="bg-primary px-4 flex-row items-center h-[60px]">
      <TouchableOpacity
        onPress={() => sidebar?.toggle?.()}
        className="w-10 h-10 rounded-full items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-[18px] font-extrabold flex-1 text-center">{title}</Text>
      <View className="w-10" />
    </View>
  );
}
