import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavbarProps {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
  onMenuPress?: () => void;
  onBackPress?: () => void;
  className?: string;
}

export default function Navbar({
  title = "LMS",
  showMenu = true,
  showBack = false,
  onMenuPress,
  onBackPress,
  className,
}: NavbarProps) {
  return (
    <View className="bg-primary px-4 py-3 flex-row items-center justify-between h-[60px]">
      {showBack && (
        <TouchableOpacity onPress={onBackPress} className="w-10 h-10 rounded-full items-center justify-center" activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      {showMenu && !showBack && (
        <TouchableOpacity onPress={onMenuPress} className="w-10 h-10 rounded-full items-center justify-center" activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Text className="color-white text-[18px] font-extrabold flex-1 text-center">{title}</Text>
      <View className="w-10" />
    </View>
  );
}
