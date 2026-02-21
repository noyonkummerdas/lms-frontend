import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Navbar, Card, ProgressBar } from "../../../components";
import { COLORS } from "../../../constants/colors";

const myCourses = [
  { id: 1, title: "React Native Basics", progress: 65 },
  { id: 2, title: "TypeScript Mastery", progress: 30 },
];

export default function MyCoursesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="My Courses" showMenu={false} />
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Enrolled Courses</Text>
        {myCourses.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/courses/${c.id}`)}>
            <Card style={styles.card}>
              <Text style={styles.courseTitle}>{c.title}</Text>
              <ProgressBar progress={c.progress} showLabel={true} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", color: COLORS.primary, marginBottom: 16 },
  card: { marginBottom: 12 },
  courseTitle: { fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
});
