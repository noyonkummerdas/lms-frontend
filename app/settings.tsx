import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";
import { COLORS } from "../constants/colors";

export default function SettingsScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

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
      <Navbar title="Settings" showBack={true} onBackPress={() => router.back()} />

      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Account Settings</Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.cardDesc}>Update your profile information</Text>
          <Button label="Edit Profile" onPress={() => router.push("/profile")} variant="secondary" />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <Text style={styles.cardDesc}>Manage notification preferences</Text>
          <Text style={styles.successText}>Notifications enabled</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Security</Text>
          <Text style={styles.cardDesc}>Change password and security settings</Text>
          <Button label="Change Password" onPress={() => {}} variant="primary" />
        </Card>

        <Card style={styles.cardLast}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.cardDesc}>LMS App v1.0.0</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  centered: { flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" },
  centeredText: { color: COLORS.primary, fontWeight: "700", marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "700", color: COLORS.primary, marginBottom: 16 },
  card: { marginBottom: 16 },
  cardLast: { marginBottom: 32 },
  cardTitle: { fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  cardDesc: { fontSize: 14, color: COLORS.gray[600], marginBottom: 12 },
  successText: { fontSize: 14, color: COLORS.success },
});
