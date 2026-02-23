import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const COURSES_DATA = [
    { id: "1", title: "React Native Basics", instructor: "John Doe", students: 450, price: "$49.99", status: "Active", color: "#61DAFB" },
    { id: "2", title: "Advanced TypeScript", instructor: "Jane Smith", students: 320, price: "$59.99", status: "Active", color: "#3178C6" },
    { id: "3", title: "Mobile UI Design", instructor: "Mike Johnson", students: 128, price: "$39.99", status: "Review", color: "#FF6B6B" },
    { id: "4", title: "Fullstack Web Dev", instructor: "Sarah Wilson", students: 890, price: "$79.99", status: "Active", color: "#4CAF50" },
    { id: "5", title: "Python for Data Science", instructor: "Chris Evans", students: 600, price: "$64.99", status: "Paused", color: "#3776AB" },
];

export default function AdminCoursesScreen() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = useMemo(() => {
        return COURSES_DATA.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleEdit = (title: string) => {
        Alert.alert("Manage Course", `Opening management panel for: ${title}`);
    };

    const renderItem = ({ item }: { item: typeof COURSES_DATA[0] }) => (
        <Card style={styles.courseCard}>
            <View style={styles.courseHeader}>
                <View style={[styles.thumbnail, { backgroundColor: item.color + "15" }]}>
                    <Ionicons name="journal" size={24} color={item.color} />
                </View>
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
                    <Text style={styles.statText}>{item.students} Students</Text>
                </View>
                <View style={styles.stat}>
                    <Ionicons name="pricetag-outline" size={14} color={COLORS.gray[400]} />
                    <Text style={styles.statText}>{item.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.manageBtn}
                    activeOpacity={0.7}
                    onPress={() => handleEdit(item.title)}
                >
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
                        placeholder="Search courses by name or teacher..."
                        style={styles.searchInput}
                        placeholderTextColor={COLORS.gray[400]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color={COLORS.gray[400]} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <FlatList
                data={filteredCourses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Ionicons name="search-outline" size={48} color={COLORS.gray[300]} />
                        <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>No courses found for "{searchQuery}"</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    header: { padding: 16, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.gray[50],
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: COLORS.primary },
    list: { padding: 16 },
    courseCard: { marginBottom: 16, padding: 16 },
    courseHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    thumbnail: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: 12 },
    courseInfo: { flex: 1 },
    courseTitle: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
    instructorText: { fontSize: 13, color: COLORS.gray[500], marginTop: 2 },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: COLORS.gray[50],
        paddingTop: 12
    },
    stat: { flexDirection: "row", alignItems: "center", marginRight: 16 },
    statText: { fontSize: 12, color: COLORS.gray[500], marginLeft: 4, fontWeight: "600" },
    manageBtn: { flexDirection: "row", alignItems: "center", marginLeft: "auto" },
    manageBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.secondary, marginRight: 4 },
});
