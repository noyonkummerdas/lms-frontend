import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { InstructorNavbar, Card } from "../../../components";
import { useGetInstructorStatsQuery } from "../../../store/api/reportApi";

export default function InstructorDashboardScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [withdrawalStatus, setWithdrawalStatus] = useState<"idle" | "pending" | "processing">("idle");
  const { data: statsData, isLoading } = useGetInstructorStatsQuery();

  console.log("[INSTRUCTOR_STATS_DEBUG] Data:", JSON.stringify(statsData, null, 2));

  const stats = [
    { label: t('active'), value: statsData?.totalStudents?.toString() || "0", icon: "people", color: "#10b981" },
    { label: t('totalEarnings'), value: `$${statsData?.earnings || 0}`, icon: "wallet", color: "#6366f1" },
    { label: t('pendingPayout'), value: `$0`, icon: "time", color: "#F39C12" },
  ];

  const handleWithdrawal = () => {
    Alert.alert(
      "Confirm Withdrawal",
      "Do you want to withdraw your current balance of $0.00?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setWithdrawalStatus("pending");
            Alert.alert(t('success', { defaultValue: 'Success' }), t('withdrawalSuccess', { defaultValue: 'Withdrawal request submitted! It will take 1-3 business days.' }));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-light">
      <InstructorNavbar title={t('instructorDashboard')} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6 mt-4">
          <Text className="text-[28px] font-extrabold text-primary">{t('greeting', { name: user?.name })}</Text>
          <Text className="text-[16px] text-slate-500 mt-1">{t('instructorSubtitle')}</Text>
        </View>

        <View className="flex-row justify-between mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="flex-1 mx-1 items-start p-4">
              <View
                className="p-2.5 rounded-xl mb-3"
                style={{ backgroundColor: stat.color + "15" }}
              >
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text className="text-[22px] font-bold text-primary">{stat.value}</Text>
              <Text className="text-[12px] text-slate-500 mt-1">{stat.label}</Text>
            </Card>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-[18px] font-bold text-primary mb-3">{t('insights')}</Text>
          <Card className="p-4">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-[13px] font-bold text-slate-500 uppercase">{t('engagement')}</Text>
              <Ionicons name="trending-up" size={18} color="#10b981" />
            </View>
            <View className="flex-row justify-between items-end h-40 pb-2">
              {[
                { day: "Mon", val: 45 }, { day: "Tue", val: 70 },
                { day: "Wed", val: 55 }, { day: "Thu", val: 90 },
                { day: "Fri", val: 65 }, { day: "Sat", val: 40 },
                { day: "Sun", val: 80 }
              ].map((d, i) => (
                <View key={i} className="items-center">
                  <View
                    className="w-[30px] rounded-lg"
                    style={{
                      height: d.val * 1.5,
                      backgroundColor: i === 3 ? "#6366f1" : "#6366f140"
                    }}
                  />
                  <Text className="text-[10px] text-slate-400 mt-2 font-semibold">{d.day}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View className="mb-6">
          <Text className="text-[18px] font-bold text-primary mb-3">{t('financePayouts')}</Text>
          <Card className="p-5 flex-row justify-between items-center bg-white">
            <View className="flex-1">
              <Text className="text-[13px] text-slate-500 mb-1">{t('availableWithdrawal')}</Text>
              <Text className="text-2xl font-black text-primary">$0.00</Text>
            </View>
            <TouchableOpacity
              className={`flex-row items-center px-4 py-3 rounded-xl ${withdrawalStatus === "idle" ? 'bg-secondary' : 'bg-success/20'}`}
              onPress={handleWithdrawal}
              disabled={withdrawalStatus !== "idle"}
            >
              <Text className={`font-bold mr-2 text-[14px] ${withdrawalStatus === "idle" ? 'text-white' : 'text-success'}`}>
                {withdrawalStatus === "idle" ? t('requestWithdrawal') : t('withdrawing')}
              </Text>
              <Ionicons
                name={withdrawalStatus === "idle" ? "arrow-forward" : "checkmark-circle"}
                size={18}
                color={withdrawalStatus === "idle" ? "white" : "#10b981"}
              />
            </TouchableOpacity>
          </Card>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
