import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllReadMutation
} from "../../../store/api/notificationApi";

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const sidebar = useSidebar();
  const { data: notifications, isLoading, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllRead] = useMarkAllReadMutation();

  console.log("[NOTIFICATIONS_DEBUG] Notifications:", JSON.stringify(notifications, null, 2));

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title={t('notifications')} showMenu={true} onMenuPress={sidebar?.toggle} />
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-[16px] font-extrabold text-primary">{t('recentActivity')}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={handleMarkAllRead}>
          <Text className="text-[13px] text-secondary font-bold">{t('markAllAsRead')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {(notifications || []).map((item) => (
          <TouchableOpacity
            key={(item as any)._id || item.id}
            activeOpacity={0.7}
            onPress={() => handleMarkRead(item.id)}
          >
            <Card className={`flex-row p-4 mb-3 items-center ${!item.isRead ? 'bg-white border-secondary/30 border' : ''}`}>
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: (item as any).color || "#6366f115" }}
              >
                <Ionicons name={(item as any).icon || "notifications"} size={24} color={(item as any).color || "#6366f1"} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-[15px] font-bold text-primary">{item.title}</Text>
                  {!item.isRead && <View className="w-2 h-2 rounded-full bg-secondary" />}
                </View>
                <Text className="text-[13px] text-slate-500 leading-[18px]" numberOfLines={2}>{item.message}</Text>
                <Text className="text-[11px] text-slate-400 mt-2 font-semibold">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
