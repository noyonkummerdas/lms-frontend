import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const COURSES_DATA = [
    { id: "1", title: "React Native Basics", instructor: "John Doe", students: 450, price: "$49.99", status: "Active", color: "#61DAFB", image: "https://picsum.photos/seed/react/200/200" },
    { id: "2", title: "Advanced TypeScript", instructor: "Jane Smith", students: 320, price: "$59.99", status: "Active", color: "#3178C6", image: "https://picsum.photos/seed/ts/200/200" },
    { id: "3", title: "Mobile UI Design", instructor: "Mike Johnson", students: 128, price: "$39.99", status: "Review", color: "#FF6B6B", image: "https://picsum.photos/seed/design/200/200" },
    { id: "4", title: "Fullstack Web Dev", instructor: "Sarah Wilson", students: 890, price: "$79.99", status: "Active", color: "#4CAF50", image: "https://picsum.photos/seed/web/200/200" },
    { id: "5", title: "Python for Data Science", instructor: "Chris Evans", students: 600, price: "$64.99", status: "Paused", color: "#3776AB", image: "https://picsum.photos/seed/python/200/200" },
];

export default function AdminCoursesScreen() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const FILTERS = ["All", "Active", "Review", "Paused"];

    const filteredCourses = useMemo(() => {
        return COURSES_DATA.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "All" || course.status === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter]);

    const renderItem = ({ item }: { item: typeof COURSES_DATA[0] }) => (
        <Card style={styles.courseCard}>
            <View style={styles.courseHeader}>
                <Image source={{ uri: item.image }} style={styles.courseThumb} />
                <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.instructorText}>by {item.instructor}</Text>
                </View>
                <View style={[styles.statusBadge, {
                    backgroundColor: item.status === "Active" ? COLORS.success + "15" :
                        item.status === "Review" ? COLORS.warning + "15" : COLORS.gray[100]
                }]}>
                    <Text style={[styles.statusText, {
                        color: item.status === "Active" ? COLORS.success :
                            item.status === "Review" ? COLORS.warning : COLORS.gray[500]
                    }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.stat}>
                    <Ionicons name="people-outline" size={14} color={COLORS.gray[500]} />
                    <Text style={styles.statText}>{item.students} students</Text>
                </View>
                <View style={styles.stat}>
                    <Ionicons name="pricetag-outline" size={14} color={COLORS.gray[400]} />
                    <Text style={styles.statText}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.manageBtn} activeOpacity={0.7}>
                    <Text style={styles.manageBtnText}>Manage</Text>
                    <Ionicons name="chevron-forward" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <AdminNavbar title="Course Management" />
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.gray[400]} />
                    <TextInput
                        placeholder="Search courses..."
                        style={styles.searchInput}
                        placeholderTextColor={COLORS.gray[400]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContent}>
                    {FILTERS.map((f) => (
                        <TouchableOpacity
                            key={f}
                            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
                            onPress={() => setActiveFilter(f)}
                        >
                            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredCourses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    header: { paddingBottom: 8, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.gray[50], paddingHorizontal: 16, height: 50, borderRadius: 14, margin: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.gray[100] },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: COLORS.primary },
    filterScroll: { marginBottom: 8 },
    filterContent: { paddingLeft: 16, paddingRight: 20 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.gray[50], marginRight: 10, borderWidth: 1, borderColor: COLORS.gray[100] },
    filterChipActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
    filterText: { fontSize: 13, fontWeight: "700", color: COLORS.gray[500] },
    filterTextActive: { color: COLORS.white },
    list: { padding: 16 },
    courseCard: { marginBottom: 16, padding: 16, borderRadius: 20 },
    courseHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    courseThumb: { width: 60, height: 60, borderRadius: 14, marginRight: 12, backgroundColor: COLORS.gray[100] },
    courseInfo: { flex: 1 },
    courseTitle: { fontSize: 15, fontWeight: "800", color: COLORS.primary },
    instructorText: { fontSize: 13, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
    statusText: { fontSize: 10, fontWeight: "900", textTransform: "uppercase" },
    statsRow: { flexDirection: "row", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[50], paddingTop: 14 },
    stat: { flexDirection: "row", alignItems: "center", marginRight: 16 },
    statText: { fontSize: 12, color: COLORS.gray[500], marginLeft: 4, fontWeight: "700" },
    manageBtn: { flexDirection: "row", alignItems: "center", marginLeft: "auto" },
    manageBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.secondary, marginRight: 4 },
});
