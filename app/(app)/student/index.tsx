import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../hooks";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

export default function StudentHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const sidebar = useSidebar();
  const [lang, setLang] = useState<"EN" | "BN">("EN");

  const t = {
    EN: {
      greeting: "Hi",
      subtitle: "Ready to learn something new?",
      active: "Active Courses",
      completed: "Completed",
      achievements: "Your Achievements",
      announcement: "New Announcement",
      continue: "Continue Learning",
      explore: "Explore All Courses",
      bundles: "Course Bundles"
    },
    BN: {
      greeting: "হ্যালো",
      subtitle: "নতুন কিছু শিখতে প্রস্তুত তো?",
      active: "অ্যাক্টিভ কোর্স",
      completed: "সম্পন্ন হয়েছে",
      achievements: "আপনার অর্জন",
      announcement: "নতুন ঘোষণা",
      continue: "পড়া চালিয়ে যান",
      explore: "সব কোর্স দেখুন",
      bundles: "কোর্স বান্ডেল"
    }
  }[lang];

  const featured = [
    { id: 1, title: "React Native Basics", icon: "logo-react", progress: 65, color: "#61DAFB" },
    { id: 2, title: "TypeScript Mastery", icon: "code-slash", progress: 30, color: "#3178C6" },
  ];

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="LMS" showMenu={true} onMenuPress={sidebar?.toggle} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.greetingRow}>
              <Text style={styles.greeting}>Hi, {user?.name}!</Text>
              <View style={styles.streakBadge}>
                <Ionicons name="flame" size={16} color="#FF6B6B" />
                <Text style={styles.streakText}>7 Days</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>Ready to learn something new?</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.languageBtn}>
              <Text style={styles.languageText}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationBtn} onPress={() => router.push("/(app)/student/notifications")}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcement System */}
        <Card style={styles.announcementCard}>
          <View style={styles.announcementHeader}>
            <Ionicons name="megaphone" size={20} color={COLORS.secondary} />
            <Text style={styles.announcementTitle}>New Announcement</Text>
          </View>
          <Text style={styles.announcementText}>Phase 2 of the React Native Lab starts this weekend. Make sure to complete your prerequisites!</Text>
        </Card>

        <View style={styles.statsOverview}>
          <Card style={styles.overviewCard}>
            <Text style={styles.overviewValue}>4</Text>
            <Text style={styles.overviewLabel}>Active Courses</Text>
          </Card>
          <Card style={styles.overviewCard}>
            <Text style={styles.overviewValue}>12</Text>
            <Text style={styles.overviewLabel}>Completed</Text>
          </Card>
        </View>

        {/* Gamification: Badges Section */}
        <View style={styles.achievementSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.achievements}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
            {[
              { id: 1, name: lang === "EN" ? "Early Bird" : "ভোরবেলা পাখি", icon: "sunny", color: "#FFD93D" },
              { id: 2, name: lang === "EN" ? "Fast Learner" : "দ্রুত শিক্ষার্থী", icon: "rocket", color: "#6C5CE7" },
              { id: 3, name: lang === "EN" ? "Quiz Master" : "কুইজ মাস্টার", icon: "ribbon", color: "#00B894" },
              { id: 4, name: lang === "EN" ? "7-Day Streak" : "৭ দিনের ধারা", icon: "flame", color: "#FF7675" },
            ].map((badge) => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={[styles.badgeIconBox, { backgroundColor: badge.color + "15" }]}>
                  <Ionicons name={badge.icon as any} size={24} color={badge.color} />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>{t.continue}</Text>
        {featured.map((c) => (
          <TouchableOpacity key={c.id} onPress={() => router.push(`/courses/${c.id}`)} activeOpacity={0.8}>
            <Card style={styles.courseCard}>
              <View style={[styles.courseIconContainer, { backgroundColor: c.color + "15" }]}>
                <Ionicons name={c.icon as any} size={32} color={c.color} />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${c.progress}%`, backgroundColor: COLORS.secondary }]} />
                  </View>
                  <Text style={styles.progressText}>{c.progress}%</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray[400]} />
            </Card>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => router.push("/student/explore")}
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.exploreBtnText}>{t.explore}</Text>
        </TouchableOpacity>

        {/* Course Bundles */}
        <View style={styles.bundleSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.bundles}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bundleScroll}>
            {[1, 2].map((b) => (
              <TouchableOpacity key={b} activeOpacity={0.9}>
                <Card style={styles.bundleCard}>
                  <View style={styles.bundleDiscount}>
                    <Text style={styles.discountText}>20% OFF</Text>
                  </View>
                  <Text style={styles.bundleName}>{b === 1 ? "Fullstack Mastery Bundle" : "Mobile Design Kit"}</Text>
                  <Text style={styles.bundleMeta}>3 Courses • $120.00</Text>
                  <View style={styles.bundleImages}>
                    <View style={[styles.bundleImg, { backgroundColor: COLORS.success + "20" }]} />
                    <View style={[styles.bundleImg, { backgroundColor: COLORS.danger + "20", marginLeft: -12 }]} />
                    <View style={[styles.bundleImg, { backgroundColor: COLORS.secondary + "20", marginLeft: -12 }]} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  greetingRow: { flexDirection: "row", alignItems: "center" },
  greeting: { fontSize: 24, fontWeight: "800", color: COLORS.primary },
  streakBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FF6B6B10", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 12 },
  streakText: { fontSize: 12, fontWeight: "800", color: "#FF6B6B", marginLeft: 4 },
  subtitle: { fontSize: 15, color: COLORS.gray[500], marginTop: 2 },
  headerActions: { flexDirection: "row", alignItems: "center" },
  languageBtn: { marginRight: 12, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  languageText: { fontSize: 13, fontWeight: "700", color: COLORS.secondary },
  notificationBtn: { padding: 8, borderRadius: 12, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  statsOverview: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  overviewCard: { flex: 1, marginHorizontal: 4, padding: 16, alignItems: "center" },
  overviewValue: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  overviewLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 4 },
  achievementSection: { marginBottom: 24 },
  badgeScroll: { marginHorizontal: -16, paddingLeft: 16 },
  badgeItem: { alignItems: "center", marginRight: 20 },
  badgeIconBox: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  badgeName: { fontSize: 11, fontWeight: "700", color: COLORS.gray[600] },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  courseCard: { marginBottom: 16, flexDirection: "row", alignItems: "center", padding: 12 },
  courseIconContainer: { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 12 },
  courseInfo: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  progressContainer: { flexDirection: "row", alignItems: "center" },
  progressBarBg: { flex: 1, height: 6, backgroundColor: COLORS.gray[200], borderRadius: 3, marginRight: 8, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },
  progressText: { fontSize: 12, fontWeight: "600", color: COLORS.gray[600] },
  exploreBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 18,
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  exploreBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  announcementCard: { backgroundColor: COLORS.primary, padding: 16, marginBottom: 24, borderRadius: 16 },
  announcementHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  announcementTitle: { color: COLORS.secondary, fontWeight: "800", marginLeft: 8, fontSize: 13, textTransform: "uppercase" },
  announcementText: { color: COLORS.white, fontSize: 14, lineHeight: 20, opacity: 0.9 },
  bundleSection: { marginTop: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  seeAll: { color: COLORS.secondary, fontWeight: "600", fontSize: 14 },
  bundleScroll: { marginHorizontal: -16, paddingLeft: 16 },
  bundleCard: { width: 260, marginRight: 16, padding: 20, backgroundColor: COLORS.white },
  bundleDiscount: { alignSelf: "flex-start", backgroundColor: COLORS.success, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 12 },
  discountText: { color: COLORS.white, fontSize: 10, fontWeight: "800" },
  bundleName: { fontSize: 17, fontWeight: "800", color: COLORS.primary, marginBottom: 4 },
  bundleMeta: { fontSize: 13, color: COLORS.gray[500], marginBottom: 16 },
  bundleImages: { flexDirection: "row" },
  bundleImg: { width: 32, height: 32, borderRadius: 8, borderWidth: 2, borderColor: COLORS.white }
});
