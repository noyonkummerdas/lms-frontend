import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSidebar } from "../contexts/SidebarContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface InstructorNavbarProps {
  title: string;
}

export default function InstructorNavbar({ title }: InstructorNavbarProps) {
  const sidebar = useSidebar();

  return (
    <View className="bg-primary px-4 py-3 flex-row items-center h-[60px]">
      <TouchableOpacity
        onPress={() => sidebar?.toggle?.()}
        className="w-10 h-10 rounded-full items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text className="color-white text-[18px] font-extrabold flex-1 text-center">{title}</Text>
      <View className="items-end justify-center">
        <LanguageSwitcher />
      </View>
    </View>
  );
}
