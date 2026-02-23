import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function AdminDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const stats = [
    { label: "Total Users", value: "1.2k", icon: "people", color: COLORS.secondary, href: "/admin/users" },
    { label: "Total Courses", value: "45", icon: "book", color: COLORS.success, href: "/admin/courses" },
    { label: "Revenue", value: "$12k", icon: "cash", color: COLORS.accent, href: "/admin/payments" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <AdminNavbar title="Admin Dashboard" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome, {user?.name || "Admin"}!</Text>
          <Text style={styles.subtitle}>Here's what's happening today.</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.statWrapper}
              activeOpacity={0.7}
              onPress={() => router.push(stat.href as any)}
            >
              <Card style={styles.statCard}>
                <View style={[styles.iconContainer, { backgroundColor: stat.color + "15" }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Overview Analytics</Text>
        <Card style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Ionicons name="analytics" size={20} color={COLORS.secondary} />
            <Text style={styles.activityTitle}>Platform Growth</Text>
          </View>
          <View style={styles.dummyChart}>
            {[30, 45, 35, 60, 50, 80, 70, 90].map((h, i) => (
              <View key={i} style={[styles.chartBar, { height: h, backgroundColor: COLORS.secondary + (i === 7 ? "FF" : "40") }]} />
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.statusRow}>
          <Card style={styles.statusCard}>
            <Ionicons name="server-outline" size={20} color={COLORS.success} />
            <Text style={styles.statusLabel}>Servers</Text>
            <Text style={styles.statusValue}>Online</Text>
          </Card>
          <Card style={styles.statusCard}>
            <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.statusLabel}>Mails</Text>
            <Text style={styles.statusValue}>Active</Text>
          </Card>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { marginBottom: 24, marginTop: 8 },
  greeting: { fontSize: 28, fontWeight: "800", color: COLORS.primary },
  subtitle: { fontSize: 16, color: COLORS.gray[500], marginTop: 4 },
  statsGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  statWrapper: { flex: 1 },
  statCard: { marginHorizontal: 4, alignItems: "flex-start", padding: 16 },
  iconContainer: { padding: 10, borderRadius: 12, marginBottom: 12 },
  statValue: { fontSize: 20, fontWeight: "800", color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginBottom: 16, marginTop: 8 },
  activityCard: { padding: 16, marginBottom: 24 },
  activityHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  activityTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary, marginLeft: 8 },
  dummyChart: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 100, paddingHorizontal: 10 },
  chartBar: { width: "8%", borderRadius: 4 },
  statusRow: { flexDirection: "row", justifyContent: "space-between" },
  statusCard: { flex: 1, marginHorizontal: 6, alignItems: "center", padding: 16 },
  statusLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 8 },
  statusValue: { fontSize: 15, fontWeight: "700", color: COLORS.primary, marginTop: 2 },
});
