import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InstructorNavbar, Card } from "../../../components";
import { useAuth } from "../../../hooks";
import { COLORS } from "../../../constants/colors";

export default function InstructorProfileScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <InstructorNavbar title="Profile" />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👨‍🏫</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, alignItems: "center" },
  avatar: { width: 80, height: 80, backgroundColor: COLORS.secondary, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarEmoji: { fontSize: 36 },
  name: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  email: { color: COLORS.gray[600] },
});
