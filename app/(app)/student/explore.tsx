import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Music"];

const courses = [
  { id: 1, title: "React Native Basics", instructor: "John Doe", icon: "logo-react", color: "#61DAFB", price: "$49.99", rating: 4.8 },
  { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", icon: "code-slash", color: "#3178C6", price: "$59.99", rating: 4.9 },
  { id: 3, title: "Mobile App Design", instructor: "Mike Johnson", icon: "color-palette", color: "#FF6B6B", price: "$39.99", rating: 4.7 },
  { id: 4, title: "Fullstack Web Dev", instructor: "Sarah Wilson", icon: "server", color: "#4CAF50", price: "$79.99", rating: 4.6 },
];

export default function ExploreScreen() {
  const router = useRouter();
  const sidebar = useSidebar();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="Explore" showMenu={true} onMenuPress={sidebar?.toggle} />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray[400]} />
          <TextInput
            placeholder="Search for courses..."
            style={styles.searchInput}
            placeholderTextColor={COLORS.gray[400]}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={() => { }}>
          <Ionicons name="options-outline" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryChip, index === 0 && styles.categoryChipActive]}
              activeOpacity={0.7}
              onPress={() => { }}
            >
              <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recommended for you</Text>

        {courses.map((c) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => router.push({
              pathname: `/courses/${c.id}`,
              params: {
                price: c.price,
                instructor: c.instructor,
                title: c.title,
                icon: c.icon,
                color: c.color
              }
            })}
            activeOpacity={0.8}
          >
            <Card style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: c.color + "15" }]}>
                <Ionicons name={c.icon as any} size={32} color={c.color} />
              </View>
              <View style={styles.info}>
                <Text style={styles.courseTitle}>{c.title}</Text>
                <Text style={styles.instructor}>by {c.instructor}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.ratingInfo}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.ratingText}>{c.rating}</Text>
                  </View>
                  <Text style={styles.price}>{c.price}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray[300]} />
            </Card>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: COLORS.primary },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scroll: { flex: 1 },
  categories: { paddingLeft: 16, marginBottom: 24, flexGrow: 0 },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary
  },
  categoryText: { fontSize: 14, fontWeight: "600", color: COLORS.gray[600] },
  categoryTextActive: { color: COLORS.white },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginHorizontal: 16, marginBottom: 16 },
  card: { marginHorizontal: 16, marginBottom: 16, flexDirection: "row", alignItems: "center", padding: 12 },
  iconBox: { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 12 },
  info: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  instructor: { fontSize: 13, color: COLORS.gray[500], marginTop: 2 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  ratingInfo: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 13, fontWeight: "700", color: COLORS.primary, marginLeft: 4 },
  price: { fontSize: 15, fontWeight: "800", color: COLORS.secondary },
});
