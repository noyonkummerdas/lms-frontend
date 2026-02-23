import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Navbar, Card, ProgressBar } from "../../components";
import { COLORS } from "../../constants/colors";

export default function CoursesScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const courses = [
    { id: 1, title: "React Native Basics", instructor: "John Doe", rating: 4.8, students: 1254, progress: 65, thumbnail: "📚" },
    { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", rating: 4.9, students: 892, progress: 45, thumbnail: "💻" },
    { id: 3, title: "Mobile App Design", instructor: "Mike Johnson", rating: 4.7, students: 543, progress: 80, thumbnail: "🎨" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Courses" showBack={true} onBackPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.secondary]} tintColor={COLORS.secondary} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Available Courses</Text>
          <Text style={styles.subtitle}>{courses.length} courses available</Text>
        </View>

        {courses.map((course) => (
          <TouchableOpacity key={course.id} onPress={() => router.push(`/courses/${course.id}`)}>
            <Card style={styles.courseCard}>
              <View style={styles.courseTop}>
                <Text style={styles.thumbnail}>{course.thumbnail}</Text>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.instructor}>by {course.instructor}</Text>
                </View>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.rating}>{course.rating}</Text>
                <Text style={styles.students}>({course.students} students)</Text>
              </View>
              <View style={styles.progressSection}>
                <Text style={styles.progressLabel}>Progress: {course.progress}%</Text>
                <ProgressBar progress={course.progress} showLabel={false} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: COLORS.primary, marginBottom: 8 },
  subtitle: { color: COLORS.gray[600] },
  courseCard: { marginBottom: 16 },
  courseTop: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  thumbnail: { fontSize: 36, marginRight: 12 },
  courseInfo: { flex: 1 },
  courseTitle: { fontWeight: "700", color: COLORS.primary, fontSize: 18 },
  instructor: { fontSize: 14, color: COLORS.gray[600] },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  star: { marginRight: 4 },
  rating: { fontSize: 14, fontWeight: "600" },
  students: { fontSize: 14, color: COLORS.gray[500], marginLeft: 8 },
  progressSection: { marginTop: 4 },
  progressLabel: { fontSize: 12, color: COLORS.gray[600], marginBottom: 4 },
});
