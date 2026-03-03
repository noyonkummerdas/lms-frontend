import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, ActivityIndicator, Image } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Navbar, Card } from "../../components";
import { COLORS } from "../../constants/colors";
import { useGetCoursesQuery } from "../../store/api/courseApi";

export default function CoursesScreen() {
  const router = useRouter();
  const { data: coursesData, isLoading, refetch } = useGetCoursesQuery();

  console.log("[COURSES_DEBUG] Courses:", JSON.stringify(coursesData, null, 2));

  const courses = coursesData || [];

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Courses" showBack={true} onBackPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={[COLORS.secondary]} tintColor={COLORS.secondary} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Available Courses</Text>
          <Text style={styles.subtitle}>{courses.length} courses available</Text>
        </View>

        {isLoading && courses.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.secondary} style={{ marginTop: 40 }} />
        ) : courses.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: COLORS.gray[400], fontSize: 16 }}>No courses available</Text>
          </View>
        ) : (
          courses.map((course) => (
            <TouchableOpacity key={course.id} onPress={() => router.push(`/courses/${course.id}`)}>
              <Card style={styles.courseCard}>
                <View style={styles.courseTop}>
                  <View style={styles.thumbnailContainer}>
                    {(course as any).image ? (
                      <Image source={{ uri: (course as any).image }} style={styles.courseImage} />
                    ) : (
                      <Text style={styles.thumbnailText}>📚</Text>
                    )}
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.instructor}>by {typeof course.instructor === 'string' ? course.instructor : (course.instructor as any)?.name}</Text>
                  </View>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.rating}>{course.rating || 0}</Text>
                  <Text style={styles.students}>({(course as any).studentsCount || 0} students)</Text>
                </View>
                <View style={styles.priceSection}>
                  <Text style={styles.priceLabel}>Price: ${course.price}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: 40 }} />
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
  courseCard: { marginBottom: 16, padding: 16 },
  courseTop: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  thumbnailContainer: { width: 60, height: 60, borderRadius: 12, backgroundColor: COLORS.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden' },
  courseImage: { width: '100%', height: '100%' },
  thumbnailText: { fontSize: 30 },
  courseInfo: { flex: 1 },
  courseTitle: { fontWeight: "700", color: COLORS.primary, fontSize: 18 },
  instructor: { fontSize: 14, color: COLORS.gray[600] },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  star: { marginRight: 4 },
  rating: { fontSize: 14, fontWeight: "600" },
  students: { fontSize: 14, color: COLORS.gray[500], marginLeft: 8 },
  priceSection: { marginTop: 4 },
  priceLabel: { fontSize: 16, color: COLORS.secondary, fontWeight: '800' },
});
