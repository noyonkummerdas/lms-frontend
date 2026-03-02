import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";

const INITIAL_PENDING = [
  { id: "1", title: "Complete Web Design", instructor: "Jane Smith", date: "2024-03-20", category: "Design", description: "Learn modern web design from scratch using Figma and Adobe XD." },
  { id: "2", title: "Advanced Python", instructor: "Mark Davis", date: "2024-03-19", category: "Development", description: "Deep dive into Python decorators, generators, and async programming." },
  { id: "3", title: "Digital Marketing 101", instructor: "Sarah Brown", date: "2024-03-18", category: "Business", description: "Master SEO, SEM, and social media marketing strategies." },
];

export default function ApprovalScreen() {
  const [courses, setCourses] = useState(INITIAL_PENDING);

  const handleApprove = (id: string, title: string) => {
    Alert.alert(
      "Confirm Approval",
      `Are you sure you want to approve "${title}"? This will make it live for all students.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Approve",
          style: "default",
          onPress: () => {
            setCourses(prev => prev.filter(c => c.id !== id));
            Alert.alert("Success", "Course has been approved and is now live.");
          }
        }
      ]
    );
  };

  const handleReject = (id: string, title: string) => {
    Alert.alert(
      "Reject Course",
      `Provide a reason for rejecting "${title}".`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            setCourses(prev => prev.filter(c => c.id !== id));
            Alert.alert("Rejected", "Course submission has been rejected.");
          }
        }
      ]
    );
  };

  const handleViewDetails = (course: typeof INITIAL_PENDING[0]) => {
    Alert.alert(
      "Course Details",
      `Title: ${course.title}\nInstructor: ${course.instructor}\nCategory: ${course.category}\n\nDescription: ${course.description}`,
      [{ text: "Close" }]
    );
  };

  const renderItem = ({ item }: { item: typeof INITIAL_PENDING[0] }) => (
    <Card className="mb-4 p-4 rounded-2xl">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 mr-3">
          <Text className="text-[16px] font-extrabold text-primary">{item.title}</Text>
          <Text className="text-[13px] text-slate-400 mt-1 font-semibold">by {item.instructor}</Text>
        </View>
        <View className="bg-secondary/15 px-2.5 py-1.5 rounded-lg">
          <Text className="text-[11px] font-black text-secondary">{item.category}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center border-t border-slate-50 pt-3.5">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#94a3b8" />
          <Text className="text-[12px] text-slate-500 ml-1 font-medium">{item.date}</Text>
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
      <AdminNavbar title="Course Approval" />
      <View className="px-4 py-3.5 bg-white border-b border-slate-100">
        <Text className="text-[13px] font-bold text-slate-500">
          {courses.length === 0 ? "No pending approvals" : `${courses.length} courses awaiting approval`}
        </Text>
      </View>

      {courses.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Ionicons name="checkmark-circle-outline" size={80} color="#10b98160" />
          <Text className="text-[22px] font-black text-primary mt-5">All caught up!</Text>
          <Text className="text-[14px] text-slate-400 text-center mt-2.5 leading-[22px]">There are no new course submissions to review at this time.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
