import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const PENDING_COURSES = [
  { id: "1", title: "Complete Web Design", instructor: "Jane Smith", date: "2024-03-20", category: "Design" },
  { id: "2", title: "Advanced Python", instructor: "Mark Davis", date: "2024-03-19", category: "Development" },
  { id: "3", title: "Digital Marketing 101", instructor: "Sarah Brown", date: "2024-03-18", category: "Business" },
];

export default function ApprovalScreen() {
  const renderItem = ({ item }: { item: typeof PENDING_COURSES[0] }) => (
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
            onPress={() => Alert.alert("Approve", `Course: ${item.title}`)}
          >
            <Ionicons name="checkmark-outline" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.rejectBtn]}
            activeOpacity={0.7}
            onPress={() => Alert.alert("Reject", `Course: ${item.title}`)}
          >
            <Ionicons name="close-outline" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.viewBtn]}
            activeOpacity={0.7}
            onPress={() => Alert.alert("View", `Details for: ${item.title}`)}
          >
            <Ionicons name="eye-outline" size={18} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title="Course Approval" />
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>{PENDING_COURSES.length} courses awaiting approval</Text>
      </View>
      <FlatList
        data={PENDING_COURSES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  infoBar: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  infoText: { fontSize: 13, fontWeight: "600", color: COLORS.gray[500] },
  list: { padding: 16 },
  courseCard: { marginBottom: 16, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  titleInfo: { flex: 1, marginRight: 12 },
  courseTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  instructor: { fontSize: 13, color: COLORS.gray[500], marginTop: 4 },
  categoryBadge: { backgroundColor: COLORS.secondary + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryText: { fontSize: 11, fontWeight: "700", color: COLORS.secondary },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[100], paddingTop: 12 },
  dateInfo: { flexDirection: "row", alignItems: "center" },
  dateText: { fontSize: 12, color: COLORS.gray[500], marginLeft: 4 },
  actions: { flexDirection: "row" },
  actionBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginLeft: 8 },
  approveBtn: { backgroundColor: COLORS.success },
  rejectBtn: { backgroundColor: COLORS.danger },
  viewBtn: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
});
