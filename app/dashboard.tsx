import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks";
import { Navbar, Card, ProgressBar } from "../components";
import { COLORS } from "../constants/colors";

export default function DashboardScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Text style={styles.centeredText}>Not authenticated</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.loginBtnText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Dashboard" />

      <ScrollView style={styles.scroll}>
        <Card style={styles.card}>
          <Text style={styles.welcome}>Welcome, {user?.name}! 👋</Text>
          <Text style={styles.role}>
            Role: <Text style={styles.roleBold}>{user?.role}</Text>
          </Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>

          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Course 1</Text>
            <ProgressBar progress={65} showLabel={true} />
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Course 2</Text>
            <ProgressBar progress={45} showLabel={true} />
          </Card>

          <Card>
            <Text style={styles.statLabel}>Course 3</Text>
            <ProgressBar progress={80} showLabel={true} />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <TouchableOpacity style={[styles.quickBtn, styles.quickSecondary]} onPress={() => router.push("/courses")}>
            <Text style={styles.quickBtnText}>📚 Browse Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickBtn, styles.quickSuccess]} onPress={() => router.push("/profile")}>
            <Text style={styles.quickBtnText}>👤 My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quickBtn, styles.quickWarning]} onPress={() => router.push("/settings")}>
            <Text style={styles.quickBtnText}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  centered: { flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" },
  centeredText: { color: COLORS.primary, fontWeight: "700", marginBottom: 16 },
  loginBtn: { backgroundColor: COLORS.secondary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  loginBtnText: { color: COLORS.white, fontWeight: "600" },
  card: { marginBottom: 24 },
  welcome: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 8 },
  role: { color: COLORS.gray[600] },
  roleBold: { fontWeight: "600", textTransform: "capitalize" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  statCard: { marginBottom: 12 },
  statLabel: { fontSize: 14, fontWeight: "600", color: COLORS.gray[600], marginBottom: 8 },
  quickBtn: { borderRadius: 8, padding: 16, marginBottom: 12 },
  quickSecondary: { backgroundColor: COLORS.secondary },
  quickSuccess: { backgroundColor: COLORS.success },
  quickWarning: { backgroundColor: COLORS.warning },
  quickBtnText: { color: COLORS.white, fontWeight: "600" },
});
