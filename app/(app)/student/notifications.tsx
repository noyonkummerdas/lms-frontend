import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

const NOTIFICATIONS = [
  { id: "1", title: "New Assignment", desc: "Your instructor posted a new assignment in React Native Basics.", time: "10m ago", icon: "document-text", color: COLORS.secondary, read: false },
  { id: "2", title: "Course Completed!", desc: "Congratulations! You have successfully completed Mobile UI Design.", time: "1h ago", icon: "trophy", color: COLORS.warning, read: true },
  { id: "3", title: "Payment Successful", desc: "Your payment for 'Advanced TypeScript' was processed successfully.", time: "1d ago", icon: "card", color: COLORS.success, read: true },
  { id: "4", title: "New Message", desc: "John Doe replied to your question in the course forum.", time: "2d ago", icon: "chatbubble", color: COLORS.accent, read: true },
];

export default function NotificationsScreen() {
  const sidebar = useSidebar();
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="Notifications" showMenu={true} onMenuPress={sidebar?.toggle} />
      <View style={styles.header}>
        <Text style={styles.recentText}>Recent Activity</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.7}>
            <Card style={[styles.card, !item.read && styles.unreadCard]}>
              <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View style={styles.info}>
                <View style={styles.titleRow}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  {!item.read && <View style={styles.dot} />}
                </View>
                <Text style={styles.notifDesc} numberOfLines={2}>{item.desc}</Text>
                <Text style={styles.notifTime}>{item.time}</Text>
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  recentText: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  markRead: { fontSize: 13, color: COLORS.secondary, fontWeight: "700" },
  scroll: { flex: 1, paddingHorizontal: 16 },
  card: { flexDirection: "row", padding: 16, marginBottom: 12, alignItems: "center" },
  unreadCard: { backgroundColor: COLORS.white, borderColor: COLORS.secondary + "30", borderWidth: 1 },
  iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 16 },
  info: { flex: 1 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  notifTitle: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary },
  notifDesc: { fontSize: 13, color: COLORS.gray[500], lineHeight: 18 },
  notifTime: { fontSize: 11, color: COLORS.gray[400], marginTop: 8, fontWeight: "600" },
});
