import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../hooks";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function AdminDashboardScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <AdminNavbar title="Admin Dashboard" />
      <ScrollView style={styles.scroll}>
        <Text style={styles.greeting}>Welcome, {user?.name}! 🔐</Text>
        <View style={styles.stats}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>1.2k</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Total Courses</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>$12k</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  greeting: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 24 },
  stats: { flexDirection: "row" },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.gray[600] },
});
