import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, ProgressBar } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

const myCourses = [
  { id: 1, title: "React Native Basics", progress: 65, totalLessons: 24, completed: 16, lastAccessed: "2 hours ago" },
  { id: 2, title: "TypeScript Mastery", progress: 30, totalLessons: 18, completed: 5, lastAccessed: "Yesterday" },
  { id: 3, title: "Mobile UI Design", progress: 100, totalLessons: 12, completed: 12, lastAccessed: "3 days ago" },
];

export default function MyCoursesScreen() {
  const router = useRouter();
  const sidebar = useSidebar();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="My Courses" showMenu={true} onMenuPress={sidebar?.toggle} />
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {["All", "In Progress", "Completed", "Favorite"].map((f, i) => (
            <TouchableOpacity key={i} style={[styles.filterChip, i === 1 && styles.filterChipActive]} activeOpacity={0.7} onPress={() => { }}>
              <Text style={[styles.filterText, i === 1 && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {myCourses.map((c) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => router.push({
              pathname: `/courses/${c.id}/learn`,
              params: { title: c.title }
            })}
            activeOpacity={0.8}
          >
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: c.progress === 100 ? COLORS.success + "15" : COLORS.secondary + "15" }]}>
                  <Ionicons
                    name={c.progress === 100 ? "checkmark-circle" : "play-circle"}
                    size={28}
                    color={c.progress === 100 ? COLORS.success : COLORS.secondary}
                  />
                </View>
                <View style={styles.titleInfo}>
                  <Text style={styles.courseTitle}>{c.title}</Text>
                  <Text style={styles.lessonCount}>{c.completed} / {c.totalLessons} Lessons</Text>
                </View>
                {c.progress === 100 && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>DONE</Text>
                  </View>
                )}
              </View>

              <View style={styles.progressSection}>
                <ProgressBar progress={c.progress} showLabel={true} />
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.accessText}>{c.lastAccessed}</Text>
                <TouchableOpacity
                  style={styles.continueBtn}
                  activeOpacity={0.7}
                  onPress={() => router.push({
                    pathname: `/courses/${c.id}/learn`,
                    params: { title: c.title }
                  })}
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
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  filterRow: { backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100], paddingVertical: 12 },
  filterScroll: { paddingLeft: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.gray[50], marginRight: 10, borderWidth: 1, borderColor: COLORS.gray[100] },
  filterChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  filterText: { fontSize: 13, fontWeight: "600", color: COLORS.gray[500] },
  filterTextActive: { color: COLORS.white },
  scroll: { flex: 1, padding: 16 },
  card: { marginBottom: 16, padding: 16 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  titleInfo: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  lessonCount: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
  completedBadge: { backgroundColor: COLORS.success + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  completedText: { fontSize: 10, fontWeight: "800", color: COLORS.success },
  progressSection: { marginBottom: 20 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[50], paddingTop: 12 },
  accessText: { fontSize: 12, color: COLORS.gray[400], fontWeight: "500" },
  continueBtn: { flexDirection: "row", alignItems: "center" },
  continueText: { fontSize: 13, fontWeight: "700", color: COLORS.secondary, marginRight: 4 },
});
