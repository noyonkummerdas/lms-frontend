import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

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
    <Card style={styles.courseCard}>
      <View style={styles.header}>
        <View style={styles.titleInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.instructor}>by {item.instructor}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.dateInfo}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.gray[500]} />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.approveBtn]}
            activeOpacity={0.7}
            onPress={() => handleApprove(item.id, item.title)}
          >
            <Ionicons name="checkmark-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.rejectBtn]}
            activeOpacity={0.7}
            onPress={() => handleReject(item.id, item.title)}
          >
            <Ionicons name="close-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.viewBtn]}
            activeOpacity={0.7}
            onPress={() => handleViewDetails(item)}
          >
            <Ionicons name="eye-outline" size={20} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title="Course Approval" />
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          {courses.length === 0 ? "No pending approvals" : `${courses.length} courses awaiting approval`}
        </Text>
      </View>

      {courses.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={80} color={COLORS.success + "40"} />
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptySub}>There are no new course submissions to review at this time.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  infoBar: { paddingHorizontal: 16, paddingVertical: 14, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100] },
  infoText: { fontSize: 13, fontWeight: "700", color: COLORS.gray[500] },
  list: { padding: 16 },
  courseCard: { marginBottom: 16, padding: 16, borderRadius: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  titleInfo: { flex: 1, marginRight: 12 },
  courseTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  instructor: { fontSize: 13, color: COLORS.gray[400], marginTop: 4, fontWeight: "600" },
  categoryBadge: { backgroundColor: COLORS.secondary + "15", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: "800", color: COLORS.secondary },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[50], paddingTop: 14 },
  dateInfo: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 12, color: COLORS.gray[500], marginLeft: 4, fontWeight: "500" },
  actions: { flexDirection: "row" },
  actionBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", marginLeft: 10 },
  approveBtn: { backgroundColor: COLORS.success },
  rejectBtn: { backgroundColor: COLORS.danger },
  viewBtn: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray[100] },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: "900", color: COLORS.primary, marginTop: 20 },
  emptySub: { fontSize: 14, color: COLORS.gray[400], textAlign: "center", marginTop: 10, lineHeight: 22 },
});
