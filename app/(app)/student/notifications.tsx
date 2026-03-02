import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";

const NOTIFICATIONS = [
  { id: "1", title: "New Assignment", desc: "Your instructor posted a new assignment in React Native Basics.", time: "10m ago", icon: "document-text", color: "#6366f1", read: false },
  { id: "2", title: "Course Completed!", desc: "Congratulations! You have successfully completed Mobile UI Design.", time: "1h ago", icon: "trophy", color: "#f59e0b", read: true },
  { id: "3", title: "Payment Successful", desc: "Your payment for 'Advanced TypeScript' was processed successfully.", time: "1d ago", icon: "card", color: "#10b981", read: true },
  { id: "4", title: "New Message", desc: "John Doe replied to your question in the course forum.", time: "2d ago", icon: "chatbubble", color: "#8b5cf6", read: true },
];

export default function NotificationsScreen() {
  const sidebar = useSidebar();
  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title="Notifications" showMenu={true} onMenuPress={sidebar?.toggle} />
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-[16px] font-extrabold text-primary">Recent Activity</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
          <Text className="text-[13px] text-secondary font-bold">Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.7}>
            <Card className={`flex-row p-4 mb-3 items-center ${!item.read ? 'bg-white border-secondary/30 border' : ''}`}>
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: item.color + "15" }}
              >
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-[15px] font-bold text-primary">{item.title}</Text>
                  {!item.read && <View className="w-2 h-2 rounded-full bg-secondary" />}
                </View>
                <Text className="text-[13px] text-slate-500 leading-[18px]" numberOfLines={2}>{item.desc}</Text>
                <Text className="text-[11px] text-slate-400 mt-2 font-semibold">{item.time}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
