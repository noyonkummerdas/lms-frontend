import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";
import { COLORS } from "../constants/colors";

export default function CertificatesScreen() {
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

  const certificates = [
    { id: "1", course: "React Native Basics", date: "2025-01-15", icon: "📚" },
    { id: "2", course: "Advanced TypeScript", date: "2025-02-01", icon: "💻" },
    { id: "3", course: "Mobile App Design", date: "2025-02-10", icon: "🎨" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="My Certificates" showBack={true} onBackPress={() => router.back()} />

      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Your Certificates</Text>

        {certificates.map((cert) => (
          <Card key={cert.id} style={styles.certCard}>
            <View style={styles.certRow}>
              <Text style={styles.certIcon}>{cert.icon}</Text>
              <View style={styles.certInfo}>
                <Text style={styles.certCourse}>{cert.course}</Text>
                <Text style={styles.certDate}>
                  Completed: {new Date(cert.date).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.certCheck}>✓</Text>
            </View>
          </Card>
        ))}

        <Button
          label="Back to Profile"
          onPress={() => router.push("/profile")}
          variant="secondary"
          style={styles.backBtn}
        />
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
  certCard: { marginBottom: 16 },
  certRow: { flexDirection: "row", alignItems: "center" },
  certIcon: { fontSize: 36, marginRight: 16 },
  certInfo: { flex: 1 },
  certCourse: { fontWeight: "700", color: COLORS.primary, fontSize: 18 },
  certDate: { fontSize: 14, color: COLORS.gray[600], marginTop: 4 },
  certCheck: { color: COLORS.success, fontSize: 24 },
  backBtn: { marginTop: 16 },
});
