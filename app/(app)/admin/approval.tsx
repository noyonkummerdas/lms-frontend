import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { useGetAdminCoursesQuery, useUpdateCourseMutation } from "../../../store/api/courseApi";
import { useMemo } from "react";

export default function ApprovalScreen() {
  const { t } = useTranslation();
  const { data: coursesData, isLoading, refetch } = useGetAdminCoursesQuery();
  const [updateCourse] = useUpdateCourseMutation();

  console.log("[APPROVAL_DEBUG] Fetched Courses:", JSON.stringify(coursesData, null, 2));

  const pendingCourses = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.filter(c => c.status === "pending");
  }, [coursesData]);

  const handleApprove = (id: string, title: string) => {
    Alert.alert(
      t('confirmApproval'),
      `${t('confirm')} "${title}"?`,
      [
        { text: t('cancel'), style: "cancel" },
        {
          text: t('approve'),
          style: "default",
          onPress: async () => {
            try {
              await updateCourse({ id, data: { status: "published" } }).unwrap();
              Alert.alert(t('success'), t('courseApproved'));
            } catch (err) {
              console.error("[APPROVAL_DEBUG] Approve Failed:", err);
              Alert.alert(t('error'), t('error'));
            }
          }
        }
      ]
    );
  };

  const handleReject = (id: string, title: string) => {
    Alert.alert(
      t('rejectCourse'),
      `${t('confirm')} "${title}"?`,
      [
        { text: t('cancel'), style: "cancel" },
        {
          text: t('reject'),
          style: "destructive",
          onPress: async () => {
            try {
              await updateCourse({ id, data: { status: "draft" } }).unwrap();
              Alert.alert(t('removed'), t('courseRejected'));
            } catch (err) {
              console.error("[APPROVAL_DEBUG] Reject Failed:", err);
              Alert.alert(t('error'), t('error'));
            }
          }
        }
      ]
    );
  };

  const handleViewDetails = (course: any) => {
    Alert.alert(
      t('courseDetails'),
      `${t('name')}: ${course.title}\n${t('instructor')}: ${(course.instructor as any)?.name}\n${t('category')}: ${(course.category as any)?.name}`,
      [{ text: t('cancel') }]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card className="mb-4 p-4 rounded-2xl">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 mr-3">
          <Text className="text-[16px] font-extrabold text-primary">{item.title}</Text>
          <Text className="text-[13px] text-slate-400 mt-1 font-semibold">{t('by')} {(item.instructor as any)?.name}</Text>
        </View>
        <View className="bg-secondary/15 px-2.5 py-1.5 rounded-lg">
          <Text className="text-[11px] font-black text-secondary">{(item.category as any)?.name}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center border-t border-slate-50 pt-3.5">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#94a3b8" />
          <Text className="text-[12px] text-slate-500 ml-1 font-medium">{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center ml-2.5 bg-success"
            activeOpacity={0.7}
            onPress={() => handleApprove(item.id, item.title)}
          >
            <Ionicons name="checkmark-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center ml-2.5 bg-rose-500"
            activeOpacity={0.7}
            onPress={() => handleReject(item.id, item.title)}
          >
            <Ionicons name="close-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center ml-2.5 bg-white border border-slate-100"
            activeOpacity={0.7}
            onPress={() => handleViewDetails(item)}
          >
            <Ionicons name="eye-outline" size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <AdminNavbar title={t('courseApproval')} />
      <View className="px-4 py-3.5 bg-white border-b border-slate-100">
        <Text className="text-[13px] font-bold text-slate-500">
          {pendingCourses.length === 0 ? t('noPendingApprovals') : t('awaitingApproval', { count: pendingCourses.length })}
        </Text>
      </View>

      {pendingCourses.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Ionicons name="checkmark-circle-outline" size={80} color="#10b98160" />
          <Text className="text-[22px] font-black text-primary mt-5">{t('allCaughtUp')}</Text>
          <Text className="text-[14px] text-slate-400 text-center mt-2.5 leading-[22px]">{t('noSubmissionsToReview')}</Text>
        </View>
      ) : (
        <FlatList
          data={pendingCourses}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id || item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </SafeAreaView>
  );
}
