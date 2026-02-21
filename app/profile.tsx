import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";
import { COLORS } from "../constants/colors";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>Not logged in</Text>
        <Button label="Go to Login" onPress={() => router.push("/auth/login")} variant="secondary" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Profile" />

      <ScrollView style={styles.scroll}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user?.role}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Information</Text>

        <Card style={styles.infoCard}>
          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
            {new Date(user?.createdAt || "").toLocaleDateString()}
          </Text>
        </Card>

        <Card style={[styles.infoCard, styles.lastCard]}>
          <Text style={styles.infoLabel}>Last Updated</Text>
          <Text style={styles.infoValue}>
            {new Date(user?.updatedAt || "").toLocaleDateString()}
          </Text>
        </Card>

        <Text style={styles.sectionTitle}>Statistics</Text>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Enrolled Courses</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>65%</Text>
            <Text style={styles.statLabel}>Avg Progress</Text>
          </Card>
        </View>

        <Button label="Edit Profile" onPress={() => router.push("/settings")} variant="secondary" style={styles.actionBtn} />
        <Button label="View Certificates" onPress={() => router.push("/certificates")} variant="primary" style={styles.actionBtn} />
        <Button label="Account Settings" onPress={() => router.push("/settings")} variant="success" style={styles.actionBtnLast} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  centered: { flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" },
  centeredText: { color: COLORS.primary, fontWeight: "700", marginBottom: 16 },
  profileCard: { marginBottom: 24, alignItems: "center" },
  avatar: { width: 80, height: 80, backgroundColor: COLORS.secondary, borderRadius: 9999, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  avatarEmoji: { fontSize: 36 },
  name: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 4 },
  email: { color: COLORS.gray[600], marginBottom: 8 },
  badge: { backgroundColor: "rgba(16, 185, 129, 0.2)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999 },
  badgeText: { color: COLORS.success, fontWeight: "600", fontSize: 12, textTransform: "capitalize" },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  infoCard: { marginBottom: 12 },
  lastCard: { marginBottom: 24 },
  infoLabel: { fontSize: 12, color: COLORS.gray[500], marginBottom: 4 },
  infoValue: { color: COLORS.primary, fontWeight: "600" },
  statsRow: { flexDirection: "row", marginBottom: 24 },
  statCard: { flex: 1, marginHorizontal: 4 },
  statValue: { fontSize: 28, textAlign: "center", marginBottom: 8, color: COLORS.primary },
  statLabel: { fontSize: 12, textAlign: "center", color: COLORS.gray[600] },
  actionBtn: { marginBottom: 12 },
  actionBtnLast: { marginBottom: 24 },
});
