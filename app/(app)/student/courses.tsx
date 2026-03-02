import { useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, ProgressBar } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";

const INITIAL_COURSES = [
  { id: 1, title: "React Native Basics", progress: 65, totalLessons: 24, completed: 16, lastAccessed: "2 hours ago", favorite: true },
  { id: 2, title: "TypeScript Mastery", progress: 30, totalLessons: 18, completed: 5, lastAccessed: "Yesterday", favorite: false },
  { id: 3, title: "Mobile UI Design", progress: 100, totalLessons: 12, completed: 12, lastAccessed: "3 days ago", favorite: true },
  { id: 4, title: "Advanced Animations", progress: 0, totalLessons: 15, completed: 0, lastAccessed: "Never", favorite: false },
  { id: 5, title: "Backend with Node.js", progress: 100, totalLessons: 20, completed: 20, lastAccessed: "1 week ago", favorite: false },
];

export default function MyCoursesScreen() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    if (activeFilter === "In Progress") {
      return INITIAL_COURSES.filter(c => c.progress > 0 && c.progress < 100);
    } else if (activeFilter === "Completed") {
      return INITIAL_COURSES.filter(c => c.progress === 100);
    } else if (activeFilter === "Favorite") {
      return INITIAL_COURSES.filter(c => c.favorite);
    } else {
      return INITIAL_COURSES;
    }
  }, [activeFilter]);

  const FILTERS = ["All", "In Progress", "Completed", "Favorite"];

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title="My Courses" showMenu={true} onMenuPress={sidebar?.toggle} />

      <View className="bg-white border-b border-slate-100 py-3.5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              className={`px-[18px] py-2.5 rounded-full mr-2.5 border-2 ${activeFilter === f ? 'bg-secondary border-secondary shadow-md' : 'bg-slate-50 border-slate-100'}`}
              activeOpacity={0.6}
              onPress={() => setActiveFilter(f)}
            >
              <Text className={`text-[13px] font-bold ${activeFilter === f ? 'text-white' : 'text-slate-500'}`}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#6366f1"]} tintColor="#6366f1" />
        }
      >
        {filteredCourses.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-20">
            <View className="w-20 h-20 rounded-full bg-slate-50 items-center justify-center mb-5">
              <Ionicons name="search-outline" size={40} color="#94a3b8" />
            </View>
            <Text className="text-[22px] font-black text-primary">Nothing here yet</Text>
            <Text className="text-[14px] text-slate-500 text-center mt-2.5 px-10 leading-[22px]">No courses match the "{activeFilter}" filter at the moment.</Text>
            <TouchableOpacity
              className="mt-6 px-6 py-3 rounded-xl bg-primary"
              onPress={() => setActiveFilter("All")}
            >
              <Text className="text-white font-bold text-[14px]">Clear Filter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredCourses.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => router.push({
                pathname: "/courses/[id]/learn",
                params: { id: c.id.toString(), title: c.title }
              } as any)}
              activeOpacity={0.8}
            >
              <Card className="mb-4 p-4 rounded-[20px]">
                <View className="flex-row items-center mb-[18px]">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 ${c.progress === 100 ? 'bg-success/15' : 'bg-secondary/15'}`}>
                    <Ionicons
                      name={c.progress === 100 ? "checkmark-circle" : "play-circle"}
                      size={28}
                      color={c.progress === 100 ? "#10b981" : "#6366f1"}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-extrabold text-primary" numberOfLines={1}>{c.title}</Text>
                    <Text className="text-[12px] text-slate-400 mt-0.5 font-semibold">{c.completed} / {c.totalLessons} Lessons</Text>
                  </View>
                  {c.favorite && (
                    <Ionicons name="heart" size={18} color="#ef4444" className="ml-2" />
                  )}
                </View>

                <View className="mb-5">
                  <ProgressBar progress={c.progress} showLabel={true} />
                </View>

                <View className="flex-row justify-between items-center border-t border-slate-50 pt-[14px]">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#94a3b8" />
                    <Text className="text-[12px] text-slate-400 font-semibold ml-1">{c.lastAccessed}</Text>
                  </View>
                  <TouchableOpacity
                    className="flex-row items-center"
                    activeOpacity={0.7}
                    onPress={() => router.push({
                      pathname: "/courses/[id]/learn",
                      params: { id: c.id.toString(), title: c.title }
                    } as any)}
                  >
                    <Text className="text-[14px] font-bold text-secondary mr-1">{c.progress === 100 ? "Review" : "Continue"}</Text>
                    <Ionicons
                      name={c.progress === 100 ? "refresh" : "arrow-forward"}
                      size={14}
                      color="#6366f1"
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
