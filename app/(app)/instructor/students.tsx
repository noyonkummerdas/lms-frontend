import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { InstructorNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const STUDENTS = [
  { id: "1", name: "Alex Johnson", email: "alex@test.com", course: "React Native Basics", progress: 85, avatar: "AJ" },
  { id: "2", name: "Sarah Williams", email: "sarah@test.com", course: "React Native Basics", progress: 45, avatar: "SW" },
  { id: "3", name: "James Miller", email: "james@test.com", course: "Advanced TypeScript", progress: 12, avatar: "JM" },
  { id: "4", name: "Emma Davis", email: "emma@test.com", course: "Mobile UI Design", progress: 60, avatar: "ED" },
];

export default function StudentsScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <InstructorNavbar title="Students" />
      <View style={styles.header}>
        <View style={styles.tabActive}>
          <Text style={styles.tabTextActive}>All Students</Text>
        </View>
        <View style={styles.tabInactive}>
          <Text style={styles.tabTextInactive}>Active</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {STUDENTS.map((item) => (
          <Card key={item.id} style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.courseName}>{item.course}</Text>
              </View>
              <TouchableOpacity style={styles.msgBtn} activeOpacity={0.7} onPress={() => { }}>
                <Ionicons name="chatbubble-outline" size={20} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Course Progress</Text>
                <Text style={styles.progressValue}>{item.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
              </View>
            </View>
          </Card>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  header: { flexDirection: "row", paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100], backgroundColor: COLORS.white },
  tabActive: { paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: COLORS.secondary, marginRight: 24 },
  tabTextActive: { fontSize: 14, fontWeight: "700", color: COLORS.secondary },
  tabInactive: { paddingVertical: 12, marginRight: 24 },
  tabTextInactive: { fontSize: 14, fontWeight: "600", color: COLORS.gray[400] },
  scroll: { flex: 1, padding: 16 },
  studentCard: { padding: 16, marginBottom: 16 },
  studentInfo: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.secondary + "15", alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: COLORS.secondary, fontWeight: "700", fontSize: 16 },
  details: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  courseName: { fontSize: 13, color: COLORS.gray[500], marginTop: 2 },
  msgBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gray[50], alignItems: "center", justifyContent: "center" },
  progressSection: { marginTop: 4 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressLabel: { fontSize: 12, color: COLORS.gray[500], fontWeight: "600" },
  progressValue: { fontSize: 12, color: COLORS.primary, fontWeight: "700" },
  progressBar: { height: 6, backgroundColor: COLORS.gray[100], borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: COLORS.secondary, borderRadius: 3 },
});
