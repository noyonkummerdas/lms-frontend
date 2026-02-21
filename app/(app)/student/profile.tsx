import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function StudentProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Profile" showMenu={false} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user?.role}</Text>
        </View>

        <Card style={styles.card}>
          <Button label="My Certificates" onPress={() => router.push("/certificates")} variant="secondary" />
        </Card>
        <Card style={styles.card}>
          <Button label="Settings" onPress={() => router.push("/settings")} variant="primary" />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, alignItems: "center" },
  avatar: { width: 80, height: 80, backgroundColor: COLORS.secondary, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarEmoji: { fontSize: 36 },
  name: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  email: { color: COLORS.gray[600], marginBottom: 8 },
  badge: { backgroundColor: COLORS.light, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, marginBottom: 24 },
  badgeText: { fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
  card: { width: "100%", marginBottom: 12 },
});
