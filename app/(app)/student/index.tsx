import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks";
import { Navbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function StudentHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const featured = [
    { id: 1, title: "React Native Basics", icon: "📚", progress: 65 },
    { id: 2, title: "TypeScript Mastery", icon: "💻", progress: 30 },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="LMS" showMenu={false} />
      <ScrollView style={styles.scroll}>
        <Text style={styles.greeting}>Welcome, {user?.name}! 👋</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>

        <Text style={styles.sectionTitle}>Continue Learning</Text>
        {featured.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/courses/${c.id}`)}>
            <Card style={styles.courseCard}>
              <Text style={styles.courseIcon}>{c.icon}</Text>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <Text style={styles.progress}>Progress: {c.progress}%</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.exploreBtn} onPress={() => router.push("/student/explore")}>
          <Text style={styles.exploreBtnText}>🔍 Explore Courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1, padding: 16 },
  greeting: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 4 },
  subtitle: { color: COLORS.gray[600], marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  courseCard: { marginBottom: 12, flexDirection: "row", alignItems: "center" },
  courseIcon: { fontSize: 36, marginRight: 12 },
  courseInfo: { flex: 1 },
  courseTitle: { fontWeight: "600", color: COLORS.primary },
  progress: { fontSize: 14, color: COLORS.gray[600], marginTop: 4 },
  exploreBtn: { backgroundColor: COLORS.secondary, borderRadius: 8, padding: 16, marginTop: 16 },
  exploreBtnText: { color: COLORS.white, fontWeight: "600", textAlign: "center" },
});
