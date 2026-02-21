import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Navbar, Card, ProgressBar, Button } from "../../components";
import { COLORS } from "../../constants/colors";

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const courses: Record<string, { title: string; instructor: string; description: string; progress: number; lessons: number; icon: string }> = {
    "1": { title: "React Native Basics", instructor: "John Doe", description: "Learn the fundamentals of React Native development, components, and styling. Perfect for beginners.", progress: 65, lessons: 12, icon: "📚" },
    "2": { title: "Advanced TypeScript", instructor: "Jane Smith", description: "Master TypeScript for React Native. Generics, decorators, and advanced type patterns.", progress: 45, lessons: 10, icon: "💻" },
    "3": { title: "Mobile App Design", instructor: "Mike Johnson", description: "Design beautiful and intuitive mobile apps. UI/UX best practices for React Native.", progress: 80, lessons: 8, icon: "🎨" },
  };

  const course = id ? courses[id] : null;

  if (!course) {
    return (
      <SafeAreaView style={styles.notFound}>
        <Text style={styles.notFoundText}>Course not found</Text>
        <Button label="Back to Courses" onPress={() => router.push("/courses")} variant="secondary" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title={course.title} showBack={true} onBackPress={() => router.back()} />

      <ScrollView style={styles.scroll}>
        <Card style={styles.heroCard}>
          <Text style={styles.icon}>{course.icon}</Text>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.instructor}>by {course.instructor}</Text>
          <ProgressBar progress={course.progress} showLabel={true} />
        </Card>

        <Text style={styles.sectionTitle}>Description</Text>
        <Card style={styles.descCard}>
          <Text style={styles.description}>{course.description}</Text>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{course.lessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{course.progress}%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </Card>
        </View>

        <Button label="Continue Learning" onPress={() => {}} variant="secondary" style={styles.btn} />
        <Button label="Back to Courses" onPress={() => router.push("/courses")} variant="primary" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  notFound: { flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" },
  notFoundText: { color: COLORS.primary, fontWeight: "700", marginBottom: 16 },
  heroCard: { marginBottom: 24, alignItems: "center" },
  icon: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 8 },
  instructor: { color: COLORS.gray[600], marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  descCard: { marginBottom: 24 },
  description: { color: COLORS.gray[600] },
  statsRow: { flexDirection: "row", marginBottom: 24 },
  statCard: { flex: 1, marginHorizontal: 8, alignItems: "center" },
  statValue: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  statLabel: { fontSize: 14, color: COLORS.gray[600] },
  btn: { marginBottom: 12 },
});
