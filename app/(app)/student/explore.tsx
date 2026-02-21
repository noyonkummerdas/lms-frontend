import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Navbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const courses = [
  { id: 1, title: "React Native Basics", instructor: "John Doe", icon: "📚" },
  { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", icon: "💻" },
  { id: 3, title: "Mobile App Design", instructor: "Mike Johnson", icon: "🎨" },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Explore" showMenu={false} />
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Available Courses</Text>
        {courses.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/courses/${c.id}`)}>
            <Card style={styles.card}>
              <Text style={styles.icon}>{c.icon}</Text>
              <View style={styles.info}>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <Text style={styles.instructor}>by {c.instructor}</Text>
              </View>
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
  card: { marginBottom: 12, flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 36, marginRight: 12 },
  info: { flex: 1 },
  courseTitle: { fontWeight: "600", color: COLORS.primary },
  instructor: { fontSize: 14, color: COLORS.gray[600] },
});
