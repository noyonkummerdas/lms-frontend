import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks";
import { AdminNavbar, Card } from "../../../components";
import { useGetAdminStatsQuery } from "../../../store/api/courseApi";

export default function AdminDashboardScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const { data: statsData, isLoading, error } = useGetAdminStatsQuery();

  console.log("[ADMIN_STATS_DEBUG] Data:", JSON.stringify(statsData, null, 2));

  const stats = [
    { label: t('totalUsers'), value: statsData?.totalUsers?.toString() || "0", icon: "people", color: "#6366f1", href: "/admin/users" },
    { label: t('totalCourses'), value: statsData?.totalCourses?.toString() || "0", icon: "book", color: "#10b981", href: "/admin/courses" },
    { label: t('revenue'), value: statsData ? `$${statsData.revenue}` : "$0", icon: "cash", color: "#8b5cf6", href: "/admin/payments" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light">
      <AdminNavbar title={t('adminDashboard')} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6 mt-6">
          <Text className="text-[28px] font-black text-primary">{t('welcomeAdmin', { name: user?.name || "Admin" })}</Text>
          <Text className="text-[16px] text-slate-500 mt-1">{t('adminSubtitle')}</Text>
        </View>

        <View className="flex-row justify-between mb-6 mx-[-4px]">
          {stats.map((stat, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 mx-1"
              activeOpacity={0.7}
              onPress={() => router.push(stat.href as any)}
            >
              <Card className="p-4 items-start rounded-2xl">
                <View
                  className="p-2.5 rounded-xl mb-3"
                  style={{ backgroundColor: stat.color + "15" }}
                >
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text className="text-[20px] font-black text-primary">{stat.value}</Text>
                <Text className="text-[12px] text-slate-500 mt-0.5 font-semibold">{stat.label}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[18px] font-black text-primary mb-4 mt-2">{t('overviewAnalytics')}</Text>
        <Card className="p-4 mb-6 rounded-3xl">
          <View className="flex-row items-center mb-5">
            <Ionicons name="analytics" size={20} color="#6366f1" />
            <Text className="text-[16px] font-bold text-primary ml-2">{t('platformGrowth')}</Text>
          </View>
          <View className="flex-row items-end justify-between h-[100px] px-2.5">
            {[30, 45, 35, 60, 50, 80, 70, 90].map((h, i) => (
              <View
                key={i}
                className="w-[8%] rounded-t-full"
                style={{
                  height: h,
                  backgroundColor: `#6366f1${i === 7 ? '' : '40'}`
                }}
              />
            ))}
          </View>
        </Card>

        <Text className="text-[18px] font-black text-primary mb-4 mt-2">{t('systemStatus')}</Text>
        <View className="flex-row justify-between mx-[-6px]">
          <Card className="flex-1 mx-1.5 items-center p-4 rounded-2xl">
            <Ionicons name="server-outline" size={20} color="#10b981" />
            <Text className="text-[12px] text-slate-500 mt-2 font-semibold">{t('servers')}</Text>
            <Text className="text-[15px] font-bold text-primary mt-0.5">{t('online')}</Text>
          </Card>
          <Card className="flex-1 mx-1.5 items-center p-4 rounded-2xl">
            <Ionicons name="mail-outline" size={20} color="#6366f1" />
            <Text className="text-[12px] text-slate-500 mt-2 font-semibold">{t('mails')}</Text>
            <Text className="text-[15px] font-bold text-primary mt-0.5">{t('activeStatus')}</Text>
          </Card>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
