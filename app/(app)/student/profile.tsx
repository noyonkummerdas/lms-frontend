import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";

export default function StudentProfileScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const sidebar = useSidebar();

  const SETTINGS = [
    { label: t('editProfile'), icon: "person-outline", color: "#6366f1", route: "/student/edit-profile" },
    { label: t('myCertificates'), icon: "ribbon-outline", color: "#f59e0b", route: "/student/certificates" },
    { label: t('paymentHistory'), icon: "wallet-outline", color: "#10b981", route: "payment" },
    { label: t('notificationSettings'), icon: "notifications-outline", color: "#8b5cf6", route: "notif" },
    { label: t('helpSupport'), icon: "help-circle-outline", color: "#64748b", route: "help" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title={t('profile')} showMenu={true} onMenuPress={sidebar?.toggle} />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8 bg-white">
          <TouchableOpacity
            className="mb-4 relative"
            activeOpacity={0.8}
            onPress={() => Alert.alert(t('upload'), t('chooseProfilePic'))}
          >
            <View className="w-[100px] h-[100px] rounded-full bg-secondary items-center justify-center">
              <Text className="text-[40px] font-extrabold text-white">{user?.name?.charAt(0) || "S"}</Text>
            </View>
            <View className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white">
              <Ionicons name="camera" size={18} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-extrabold text-primary mb-1">{user?.name || t('student')}</Text>
          <Text className="text-[13px] font-bold text-secondary tracking-widest uppercase">{t('learner')}</Text>
        </View>

        <View className="flex-row bg-white py-5 border-t border-slate-100 mb-6">
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/student/courses")}>
            <Text className="text-[18px] font-extrabold text-primary">8</Text>
            <Text className="text-[12px] text-slate-500 mt-0.5">{t('courses')}</Text>
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-[18px] font-extrabold text-primary">12</Text>
            <Text className="text-[12px] text-slate-500 mt-0.5">{t('completed')}</Text>
          </View>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/student/certificates")}>
            <Text className="text-[18px] font-extrabold text-primary">4</Text>
            <Text className="text-[12px] text-slate-500 mt-0.5">{t('achievements')}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-[16px] font-bold text-primary mx-4 mb-3">{t('settings')}</Text>
        <Card className="mx-4 p-0 overflow-hidden mb-6">
          {SETTINGS.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center p-4 ${index !== SETTINGS.length - 1 ? 'border-b border-slate-50' : ''}`}
              activeOpacity={0.7}
              onPress={() => item.route.startsWith("/") ? router.push(item.route as any) : Alert.alert(item.label, `Navigate to ${item.label} screen`)}
            >
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: item.color + "15" }}
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text className="flex-1 text-[15px] font-semibold text-primary">{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity
          className="flex-row items-center justify-center mx-4 p-4 rounded-xl border-[1.5px] border-rose-500/30"
          onPress={() => router.replace("/auth/login")}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-[16px] font-bold text-rose-500 ml-2">{t('logout')}</Text>
        </TouchableOpacity>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
