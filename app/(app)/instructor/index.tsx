import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../hooks";
import { InstructorNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function InstructorDashboardScreen() {
  const { user } = useAuth();

  const stats = [
    { label: "My Courses", value: "3", icon: "library", color: COLORS.secondary },
    { label: "Total Students", value: "128", icon: "people", color: COLORS.success },
    { label: "Monthly Earnings", value: "$1.2k", icon: "wallet", color: COLORS.accent },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <InstructorNavbar title="Instructor Dashboard" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name}!</Text>
          <Text style={styles.subtitle}>Your students are making progress.</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: stat.color + "15" }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Course Insights</Text>
        <Card style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>Course analytics will be here.</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: "800", color: COLORS.primary },
  subtitle: { fontSize: 16, color: COLORS.gray[500], marginTop: 4 },
  statsGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: "flex-start", padding: 16 },
  iconContainer: { padding: 10, borderRadius: 12, marginBottom: 12 },
  statValue: { fontSize: 22, fontWeight: "700", color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  placeholderCard: { padding: 20, alignItems: "center", borderStyle: "dashed", borderWidth: 1, borderColor: COLORS.gray[300], backgroundColor: "transparent" },
  placeholderText: { color: COLORS.gray[400] },
});
