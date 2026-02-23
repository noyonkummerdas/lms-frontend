import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Navbar, Card, Button } from "../../components";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    price?: string;
    instructor?: string;
    title?: string;
    icon?: string;
    color?: string;
  }>();

  const mockDetails = {
    description: "Learn the fundamentals of this course with deep-dive lessons, hands-on projects, and expert mentorship. Perfect for students looking to advance their skills to a professional level.",
    lessons: 24,
    duration: "12 Hours",
    level: "Intermediate"
  };

  const currentPrice = params.price || "$49.99";
  const currentTitle = params.title || "Course Details";

  const handleEnroll = () => {
    const isFree = currentPrice === "FREE" || currentPrice === "$0.00";
    Alert.alert(
      isFree ? "Enrollment" : "Purchase Course",
      `Would you like to ${isFree ? "enroll in" : "purchase"} "${currentTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isFree ? "Enroll Now" : "Pay Now",
          onPress: () => {
            Alert.alert("Success", "You have successfully gained access to this course!");
            router.replace("/(app)/student/courses");
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title={currentTitle} showBack={true} onBackPress={() => router.back()} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={styles.heroCard}>
          <View style={[styles.iconBox, { backgroundColor: (params.color || COLORS.secondary) + "15" }]}>
            <Text style={styles.heroIcon}>{params.icon || "📚"}</Text>
          </View>
          <Text style={styles.title}>{currentTitle}</Text>
          <Text style={styles.instructor}>by {params.instructor || "Expert Instructor"}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{currentPrice}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Course Overview</Text>
        <Card style={styles.descCard}>
          <Text style={styles.description}>{mockDetails.description}</Text>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{mockDetails.lessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{mockDetails.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </Card>
        </View>

        <View style={styles.subscriptionBox}>
          <Ionicons name="sparkles" size={20} color={COLORS.secondary} />
          <Text style={styles.subText}>Available with PRO Subscription</Text>
        </View>

        <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewScroll}>
          {[1, 2, 3].map((r) => (
            <Card key={r} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatarPlaceholder} />
                <View>
                  <Text style={styles.reviewerName}>User {r}</Text>
                  <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map(s => <Ionicons key={s} name="star" size={12} color={COLORS.warning} />)}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>This course is amazing! The lessons are clear and easy to follow.</Text>
            </Card>
          ))}
        </ScrollView>

        <View style={styles.actionRow}>
          <Button
            label={currentPrice === "FREE" || currentPrice === "$0.00" ? "Enroll for Free" : `Unlock Course - ${currentPrice}`}
            onPress={handleEnroll}
            variant="primary"
            style={styles.enrollBtn}
          />
        </View>
        <Button
          label="Browse Other Courses"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.backBtn}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  heroCard: { marginBottom: 24, alignItems: "center", padding: 24 },
  iconBox: { width: 80, height: 80, borderRadius: 20, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  heroIcon: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.primary, textAlign: "center", marginBottom: 8 },
  instructor: { fontSize: 15, color: COLORS.gray[500], marginBottom: 16 },
  priceBadge: { backgroundColor: COLORS.secondary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  priceText: { color: COLORS.white, fontWeight: "800", fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginBottom: 16 },
  descCard: { marginBottom: 24, padding: 20 },
  description: { fontSize: 15, color: COLORS.gray[600], lineHeight: 22 },
  statsRow: { flexDirection: "row", marginBottom: 32 },
  statCard: { flex: 1, marginHorizontal: 8, alignItems: "center", padding: 16 },
  statValue: { fontSize: 20, fontWeight: "800", color: COLORS.primary },
  statLabel: { fontSize: 13, color: COLORS.gray[400], marginTop: 4, fontWeight: "600" },
  actionRow: { marginBottom: 12 },
  enrollBtn: { height: 56, borderRadius: 16 },
  backBtn: { height: 56, borderRadius: 16, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  subscriptionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary + "10",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.secondary + "30"
  },
  subText: { marginLeft: 8, color: COLORS.secondary, fontWeight: "700", fontSize: 14 },
  reviewScroll: { marginBottom: 32, marginHorizontal: -16, paddingLeft: 16 },
  reviewCard: { width: 280, marginRight: 16, padding: 16 },
  reviewHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gray[200], marginRight: 12 },
  reviewerName: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
  starRow: { flexDirection: "row", marginTop: 2 },
  reviewText: { fontSize: 13, color: COLORS.gray[600], lineHeight: 18 }
});
