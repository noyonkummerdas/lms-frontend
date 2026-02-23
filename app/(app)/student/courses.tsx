import { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, ProgressBar } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

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
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    console.log("Filtering by:", activeFilter); // Internal debug
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
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="My Courses" showMenu={true} onMenuPress={sidebar?.toggle} />

      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                activeFilter === f && styles.filterChipActive
              ]}
              activeOpacity={0.6}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === f && styles.filterTextActive
              ]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="search-outline" size={40} color={COLORS.gray[400]} />
            </View>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptySub}>No courses match the "{activeFilter}" filter at the moment.</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => setActiveFilter("All")}
            >
              <Text style={styles.resetBtnText}>Clear Filter</Text>
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
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[
                    styles.iconBox,
                    { backgroundColor: c.progress === 100 ? COLORS.success + "15" : COLORS.secondary + "15" }
                  ]}>
                    <Ionicons
                      name={c.progress === 100 ? "checkmark-circle" : "play-circle"}
                      size={28}
                      color={c.progress === 100 ? COLORS.success : COLORS.secondary}
                    />
                  </View>
                  <View style={styles.titleInfo}>
                    <Text style={styles.courseTitle} numberOfLines={1}>{c.title}</Text>
                    <Text style={styles.lessonCount}>{c.completed} / {c.totalLessons} Lessons</Text>
                  </View>
                  {c.favorite && (
                    <Ionicons name="heart" size={18} color={COLORS.danger} style={{ marginLeft: 8 }} />
                  )}
                </View>

                <View style={styles.progressSection}>
                  <ProgressBar progress={c.progress} showLabel={true} />
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.timeInfo}>
                    <Ionicons name="time-outline" size={14} color={COLORS.gray[400]} />
                    <Text style={styles.accessText}>{c.lastAccessed}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.continueBtn}
                    activeOpacity={0.7}
                    onPress={() => router.push({
                      pathname: "/courses/[id]/learn",
                      params: { id: c.id.toString(), title: c.title }
                    } as any)}
                  >
                    <Text style={styles.continueText}>{c.progress === 100 ? "Review" : "Continue"}</Text>
                    <Ionicons
                      name={c.progress === 100 ? "refresh" : "arrow-forward"}
                      size={14}
                      color={COLORS.secondary}
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

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  filterRow: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
    paddingVertical: 14
  },
  filterScroll: { paddingLeft: 16, paddingRight: 20 },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.gray[50],
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: COLORS.gray[100]
  },
  filterChipActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
    elevation: 4,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterText: { fontSize: 13, fontWeight: "700", color: COLORS.gray[500] },
  filterTextActive: { color: COLORS.white },
  scroll: { flex: 1, padding: 16 },
  card: { marginBottom: 16, padding: 16, borderRadius: 20 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  iconBox: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", marginRight: 12 },
  titleInfo: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  lessonCount: { fontSize: 12, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
  progressSection: { marginBottom: 20 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[50],
    paddingTop: 14
  },
  timeInfo: { flexDirection: "row", alignItems: "center" },
  accessText: { fontSize: 12, color: COLORS.gray[400], fontWeight: "600", marginLeft: 4 },
  continueBtn: { flexDirection: "row", alignItems: "center" },
  continueText: { fontSize: 14, fontWeight: "700", color: COLORS.secondary, marginRight: 4 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 80 },
  emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.gray[50], alignItems: "center", justifyContent: "center", marginBottom: 20 },
  emptyTitle: { fontSize: 22, fontWeight: "900", color: COLORS.primary },
  emptySub: { fontSize: 14, color: COLORS.gray[500], textAlign: "center", marginTop: 10, paddingHorizontal: 40, lineHeight: 22 },
  resetBtn: { marginTop: 24, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, backgroundColor: COLORS.primary },
  resetBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
});
