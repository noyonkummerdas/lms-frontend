import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useGetMyEnrolledCoursesQuery, useGetLearningProgressQuery } from "../../../store/api/enrollmentApi";

export default function StudentHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const sidebar = useSidebar();

  const { data: enrolledCourses, isLoading: loadingCourses } = useGetMyEnrolledCoursesQuery();
  const { data: progressData } = useGetLearningProgressQuery();

  console.log("[STUDENT_DASHBOARD_DEBUG] Enrolled Courses:", JSON.stringify(enrolledCourses, null, 2));

  const activeCourses = enrolledCourses?.filter(c => (c as any).progress > 0 && (c as any).progress < 100) || [];
  const completedCourses = enrolledCourses?.filter(c => (c as any).progress === 100) || [];

  // For "Continue Learning" section
  const featured = enrolledCourses?.slice(0, 2).map((c, idx) => ({
    id: c.id,
    title: c.title,
    icon: idx === 0 ? "logo-react" : "code-slash",
    progress: (c as any).progress || 0,
    color: idx === 0 ? "#61DAFB" : "#3178C6"
  })) || [];


  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title="LMS" showMenu={true} onMenuPress={sidebar?.toggle} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6 mt-4">
          <View>
            <View className="flex-row items-center">
              <Text className="text-2xl font-extrabold text-primary">{t('greeting', { name: user?.name })}</Text>
              <View className="flex-row items-center bg-[#FF6B6B10] px-2 py-1 rounded-xl ml-3">
                <Ionicons name="flame" size={16} color="#FF6B6B" />
                <Text className="text-[12px] font-extrabold text-[#FF6B6B] ml-1">7 Days</Text>
              </View>
            </View>
            <Text className="text-[15px] text-slate-500 mt-1">{t('learningSubtitle')}</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-2 rounded-xl bg-white border border-border"
              onPress={() => router.push("/(app)/student/notifications")}
            >
              <Ionicons name="notifications-outline" size={24} color="#0f172a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcement System */}
        <Card className="bg-primary p-4 mb-6 rounded-2xl">
          <View className="flex-row items-center mb-2">
            <Ionicons name="megaphone" size={20} color="#6366f1" />
            <Text className="text-secondary font-extrabold ml-2 text-[13px] uppercase">New Announcement</Text>
          </View>
          <Text className="text-white text-[14px] leading-5 opacity-90">Phase 2 of the React Native Lab starts this weekend. Make sure to complete your prerequisites!</Text>
        </Card>

        <View className="flex-row justify-between mb-6">
          <Card className="flex-1 mx-1 p-4 items-center">
            <Text className="text-2xl font-bold text-primary">{activeCourses.length}</Text>
            <Text className="text-[12px] text-slate-500 mt-1">{t('active')}</Text>
          </Card>
          <Card className="flex-1 mx-1 p-4 items-center">
            <Text className="text-2xl font-bold text-primary">{completedCourses.length}</Text>
            <Text className="text-[12px] text-slate-500 mt-1">{t('completed')}</Text>
          </Card>
        </View>

        {/* Gamification: Badges Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold text-primary">{t('achievements')}</Text>
            <TouchableOpacity><Text className="text-secondary font-semibold text-[14px]">{t('seeAll')}</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ml-[-16px] pl-4">
            {[
              { id: 1, name: t('earlyBird'), icon: "sunny", color: "#FFD93D" },
              { id: 2, name: t('fastLearner'), icon: "rocket", color: "#6C5CE7" },
              { id: 3, name: t('quizMaster'), icon: "ribbon", color: "#00B894" },
              { id: 4, name: t('streak'), icon: "flame", color: "#FF7675" },
            ].map((badge) => (
              <View key={badge.id} className="items-center mr-5">
                <View
                  className="w-14 h-14 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: badge.color + "15" }}
                >
                  <Ionicons name={badge.icon as any} size={24} color={badge.color} />
                </View>
                <Text className="text-[11px] font-bold text-slate-600">{badge.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text className="text-[18px] font-bold text-primary mb-3">{t('continueLearning')}</Text>
        {featured.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/courses/${c.id}`)} activeOpacity={0.8}>
            <Card className="mb-4 flex-row items-center p-3">
              <View
                className="w-16 h-16 rounded-2xl items-center justify-center mr-3"
                style={{ backgroundColor: c.color + "15" }}
              >
                <Ionicons name={c.icon as any} size={32} color={c.color} />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-semibold text-primary mb-2">{c.title}</Text>
                <View className="flex-row items-center">
                  <View className="flex-1 h-1.5 bg-slate-200 rounded-full mr-2 overflow-hidden">
                    <View
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </View>
                  <Text className="text-[12px] font-semibold text-slate-600">{c.progress}%</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Card>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="flex-row bg-secondary rounded-xl p-[18px] mt-2 justify-center items-center shadow-lg shadow-indigo-500/30 elevation-5"
          onPress={() => router.push("/(app)/student/explore")}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-[16px]">{t('exploreAll')}</Text>
        </TouchableOpacity>

        {/* Course Bundles */}
        <View className="mt-6 mb-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[18px] font-bold text-primary">{t('courseBundles')}</Text>
            <TouchableOpacity><Text className="text-secondary font-semibold text-[14px]">{t('seeAll')}</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ml-[-16px] pl-4">
            {[1, 2].map((b) => (
              <TouchableOpacity key={b} activeOpacity={0.9}>
                <Card className="w-[260px] mr-4 p-5 bg-white">
                  <View className="self-start bg-success px-2 py-1 rounded-lg mb-3">
                    <Text className="text-white text-[10px] font-extrabold">20% OFF</Text>
                  </View>
                  <Text className="text-[17px] font-extrabold text-primary mb-1">{b === 1 ? "Fullstack Mastery Bundle" : "Mobile Design Kit"}</Text>
                  <Text className="text-[13px] text-slate-500 mb-4">3 Courses • $120.00</Text>
                  <View className="flex-row">
                    <View className="w-8 h-8 rounded-lg border-2 border-white bg-emerald-100" />
                    <View className="w-8 h-8 rounded-lg border-2 border-white bg-rose-100 ml-[-12px]" />
                    <View className="w-8 h-8 rounded-lg border-2 border-white bg-indigo-100 ml-[-12px]" />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
