import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }[];
}

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
}: SidebarProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <TouchableOpacity
        className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-40"
        onPress={onClose}
        activeOpacity={1}
      />
      <View className="absolute left-0 top-0 bottom-0 w-[280px] bg-primary z-50 pt-10 shadow-2xl elevation-20">
        <View className="flex-row items-center justify-between px-5 mb-6 mt-2.5">
          <TouchableOpacity className="flex-row items-center flex-1" activeOpacity={0.8}>
            <View className="w-12 h-12 rounded-full bg-secondary items-center justify-center border-2 border-white/20">
              <Text className="text-white text-[20px] font-black">{user?.name?.charAt(0) || "U"}</Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white text-[16px] font-bold" numberOfLines={1}>{user?.name || "Global User"}</Text>
              <Text className="text-slate-400 text-[12px] font-semibold uppercase tracking-widest mt-0.5">{user?.role || "Student"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} className="p-1" activeOpacity={0.7}>
            <Ionicons name="close-circle" size={28} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="px-5 py-3.5 mx-3 my-0.5 rounded-xl border-l-4 border-transparent active:bg-white/5 active:border-secondary"
              activeOpacity={0.7}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <View className="flex-row items-center">
                {item.icon && (
                  <View className="mr-3">
                    <Ionicons name={item.icon} size={20} color="#94a3b8" />
                  </View>
                )}
                <Text className="text-slate-200 text-[15px] font-semibold">{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
