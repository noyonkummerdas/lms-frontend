import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { InstructorNavbar, Card } from "../../../components";

const COURSES = [
  { id: "1", title: "React Native Basics", status: "Published", students: 45, rating: 4.8, color: "#61DAFB" },
  { id: "2", title: "Advanced TypeScript", status: "Draft", students: 0, rating: 0, color: "#3178C6" },
  { id: "3", title: "Mobile UI Design", status: "Published", students: 128, rating: 4.9, color: "#FF6B6B" },
];

export default function MyCoursesScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <InstructorNavbar title="My Courses" />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-[14px] text-slate-500 font-bold">{COURSES.length} Courses Total</Text>
          <TouchableOpacity className="flex-row items-center" activeOpacity={0.7} onPress={() => { }}>
            <Ionicons name="filter" size={20} color="#64748b" />
            <Text className="text-[14px] text-slate-500 ml-1 font-semibold">Filter</Text>
          </TouchableOpacity>
        </View>

        {COURSES.map((course) => (
          <Card key={course.id} className="flex-row p-3 mb-4 rounded-2xl">
            <View
              className="w-20 h-20 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: course.color + "20" }}
            >
              <Ionicons name="play-circle" size={40} color={course.color} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-start">
                <Text className="text-[16px] font-bold text-primary flex-1 mr-2" numberOfLines={2}>{course.title}</Text>
                <View className={`px-2 py-0.5 rounded-md ${course.status === "Published" ? 'bg-success/10' : 'bg-amber-500/10'}`}>
                  <Text className={`text-[10px] font-black ${course.status === "Published" ? 'text-success' : 'text-amber-500'}`}>{course.status}</Text>
                </View>
              </View>

              <View className="flex-row mt-2">
                <View className="flex-row items-center mr-4">
                  <Ionicons name="people-outline" size={14} color="#94a3b8" />
                  <Text className="text-[12px] text-slate-500 ml-1 font-medium">{course.students} Students</Text>
                </View>
                {course.rating > 0 && (
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#f59e0b" />
                    <Text className="text-[12px] text-slate-600 ml-1 font-bold">{course.rating}</Text>
                  </View>
                )}
              </View>

              <View className="flex-row mt-4 pt-3 border-t border-slate-50">
                <TouchableOpacity className="flex-row items-center mr-5" activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="create-outline" size={18} color="#6366f1" />
                  <Text className="text-[13px] font-bold text-secondary ml-1.5">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center mr-5" activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="bar-chart-outline" size={18} color="#6366f1" />
                  <Text className="text-[13px] font-bold text-secondary ml-1.5">Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity className="ml-auto p-1" activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="ellipsis-horizontal" size={18} color="#cbd5e1" />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}

        <TouchableOpacity
          className="flex-row bg-secondary p-4 rounded-2xl items-center justify-center mt-2.5 mb-10 shadow-lg shadow-indigo-500/30 elevation-5"
          activeOpacity={0.8}
          onPress={() => router.push("/instructor/create-course")}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text className="text-white font-black text-[16px] ml-2">Create New Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
