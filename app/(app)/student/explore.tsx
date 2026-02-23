import { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Music"];

const INITIAL_COURSES = [
  { id: 1, title: "React Native Basics", instructor: "John Doe", icon: "logo-react", color: "#61DAFB", price: "$49.99", rating: 4.8, category: "Development" },
  { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", icon: "code-slash", color: "#3178C6", price: "$59.99", rating: 4.9, category: "Development" },
  { id: 3, title: "Mobile App Design", instructor: "Mike Johnson", icon: "color-palette", color: "#FF6B6B", price: "$39.99", rating: 4.7, category: "Design" },
  { id: 4, title: "Fullstack Web Dev", instructor: "Sarah Wilson", icon: "server", color: "#4CAF50", price: "$79.99", rating: 4.6, category: "Development" },
  { id: 5, title: "Business Strategy", instructor: "Alex Brown", icon: "business", color: "#FF9800", price: "$69.99", rating: 4.5, category: "Business" },
  { id: 6, title: "Digital Marketing", instructor: "Emily Davis", icon: "megaphone", color: "#E91E63", price: "$44.99", rating: 4.4, category: "Marketing" },
];

export default function ExploreScreen() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [wishlist, setWishlist] = useState<number[]>([2, 4]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      Alert.alert("Removed", "Course removed from your wishlist.");
    } else {
      setWishlist(prev => [...prev, id]);
      Alert.alert("Added", "Course added to your wishlist!");
    }
  };

  const filteredCourses = useMemo(() => {
    return INITIAL_COURSES.filter(course => {
      const matchCategory = activeCategory === "All" || course.category === activeCategory;
      const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color={COLORS.gray[300]} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          activeOpacity={0.7}
          onPress={() => Alert.alert("Filter", "Filter options coming soon!")}
        >
          <Ionicons name="options-outline" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
              activeOpacity={0.7}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>
            {activeCategory === "All" ? "Recommended for you" : `${activeCategory} Courses`}
          </Text>
          <TouchableOpacity onPress={() => router.push("/student/wishlist")}>
            <Text style={styles.viewAll}>My Wishlist</Text>
          </TouchableOpacity>
        </View>

        {filteredCourses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={COLORS.gray[200]} />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptySub}>We couldn't find any courses matching your criteria.</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              <Text style={styles.resetBtnText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredCourses.map((c) => (
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
              } as any)}
              activeOpacity={0.8}
            >
              <Card style={styles.card}>
                <View style={[styles.iconBox, { backgroundColor: c.color + "15" }]}>
                  <Ionicons name={c.icon as any} size={32} color={c.color} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.courseTitle} numberOfLines={1}>{c.title}</Text>
                  <Text style={styles.instructor}>by {c.instructor}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.ratingInfo}>
                      <Ionicons name="star" size={14} color={COLORS.warning} />
                      <Text style={styles.ratingText}>{c.rating}</Text>
                    </View>
                    <Text style={styles.price}>{c.price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.wishBtn}
                  onPress={() => toggleWishlist(c.id)}
                >
                  <Ionicons
                    name={wishlist.includes(c.id) ? "heart" : "heart-outline"}
                    size={24}
                    color={wishlist.includes(c.id) ? COLORS.danger : COLORS.gray[300]}
                  />
                </TouchableOpacity>
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
  searchContainer: { flexDirection: "row", padding: 16, alignItems: "center" },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, height: 52, borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.gray[100], marginRight: 12 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: COLORS.primary },
  filterBtn: { width: 52, height: 52, backgroundColor: COLORS.white, borderRadius: 16, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.gray[100] },
  scroll: { flex: 1 },
  categories: { paddingLeft: 16, marginBottom: 24, flexGrow: 0 },
  categoryChip: { paddingHorizontal: 22, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 25, marginRight: 10, borderWidth: 1, borderColor: COLORS.gray[100] },
  categoryChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  categoryText: { fontSize: 14, fontWeight: "700", color: COLORS.gray[500] },
  categoryTextActive: { color: COLORS.white },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.primary },
  viewAll: { fontSize: 14, fontWeight: "700", color: COLORS.secondary },
  card: { marginHorizontal: 16, marginBottom: 16, flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 20 },
  iconBox: { width: 68, height: 68, borderRadius: 18, alignItems: "center", justifyContent: "center", marginRight: 14 },
  info: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  instructor: { fontSize: 13, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  ratingInfo: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 13, fontWeight: "700", color: COLORS.primary, marginLeft: 4 },
  price: { fontSize: 16, fontWeight: "900", color: COLORS.secondary },
  wishBtn: { padding: 8, marginLeft: 4 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 60, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: "900", color: COLORS.primary, marginTop: 20 },
  emptySub: { fontSize: 14, color: COLORS.gray[400], textAlign: "center", marginTop: 8, lineHeight: 22 },
  resetBtn: { marginTop: 24, paddingHorizontal: 32, paddingVertical: 14, backgroundColor: COLORS.primary, borderRadius: 16 },
  resetBtnText: { color: COLORS.white, fontWeight: "800" },
});
