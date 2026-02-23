import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { InstructorNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const COURSES = [
  { id: "1", title: "React Native Basics", status: "Published", students: 45, rating: 4.8, color: "#61DAFB" },
  { id: "2", title: "Advanced TypeScript", status: "Draft", students: 0, rating: 0, color: "#3178C6" },
  { id: "3", title: "Mobile UI Design", status: "Published", students: 128, rating: 4.9, color: "#FF6B6B" },
];

export default function MyCoursesScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <InstructorNavbar title="My Courses" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.countText}>{COURSES.length} Courses Total</Text>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
            <Ionicons name="filter" size={20} color={COLORS.gray[500]} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {COURSES.map((course) => (
          <Card key={course.id} style={styles.courseCard}>
            <View style={[styles.thumbnail, { backgroundColor: course.color + "20" }]}>
              <Ionicons name="play-circle" size={40} color={course.color} />
            </View>
            <View style={styles.courseInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: course.status === "Published" ? COLORS.success + "15" : COLORS.warning + "15" }]}>
                  <Text style={[styles.statusText, { color: course.status === "Published" ? COLORS.success : COLORS.warning }]}>{course.status}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={14} color={COLORS.gray[500]} />
                  <Text style={styles.metaText}>{course.students} Students</Text>
                </View>
                {course.rating > 0 && (
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.metaText}>{course.rating}</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="create-outline" size={18} color={COLORS.secondary} />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="bar-chart-outline" size={18} color={COLORS.secondary} />
                  <Text style={styles.actionBtnText}>Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7} onPress={() => { }}>
                  <Ionicons name="ellipsis-horizontal" size={18} color={COLORS.gray[400]} />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}

        <TouchableOpacity
          style={styles.createBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/instructor/create-course")}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
          <Text style={styles.createBtnText}>Create New Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  countText: { fontSize: 14, color: COLORS.gray[500], fontWeight: "600" },
  filterBtn: { flexDirection: "row", alignItems: "center" },
  filterText: { fontSize: 14, color: COLORS.gray[500], marginLeft: 4, fontWeight: "500" },
  courseCard: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 16,
    borderRadius: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  courseInfo: { flex: 1 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  courseTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary, flex: 1, marginRight: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: "800" },
  metaRow: { flexDirection: "row", marginTop: 8 },
  metaItem: { flexDirection: "row", alignItems: "center", marginRight: 16 },
  metaText: { fontSize: 12, color: COLORS.gray[500], marginLeft: 4 },
  actionRow: { flexDirection: "row", marginTop: 16, borderTopWidth: 1, borderTopColor: COLORS.gray[100], paddingTop: 12 },
  actionBtn: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  actionBtnText: { fontSize: 13, fontWeight: "600", color: COLORS.secondary, marginLeft: 6 },
  moreBtn: { marginLeft: "auto", padding: 4 },
  createBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 16, marginLeft: 8 },
});
