import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InstructorNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function MyCoursesScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <InstructorNavbar title="My Courses" />
      <ScrollView style={styles.scroll}>
        <Card>
          <Text style={styles.courseTitle}>React Native Basics</Text>
          <Text style={styles.status}>Published • 45 students</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  courseTitle: { fontWeight: "600", color: COLORS.primary },
  status: { fontSize: 14, color: COLORS.gray[600], marginTop: 4 },
});
