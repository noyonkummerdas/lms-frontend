import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetAdminCoursesQuery, useDeleteCourseMutation } from "../../../store/api/courseApi";

export default function AdminCoursesScreen() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const { data: coursesData, isLoading, refetch } = useGetAdminCoursesQuery();
    const [deleteCourse] = useDeleteCourseMutation();

    console.log("[ADMIN_COURSES_DEBUG] Fetched Courses:", JSON.stringify(coursesData, null, 2));

    const FILTERS = ["All", "published", "pending", "draft"];

    const handleDeleteCourse = (id: string, title: string) => {
        Alert.alert(
            t('confirmDelete', { defaultValue: 'Confirm Delete' }),
            `${t('confirmDeleteCourseMessage', { defaultValue: 'Are you sure you want to delete the course' })} "${title}"?`,
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteCourse(id).unwrap();
                            Alert.alert(t('success'), t('courseDeleted', { defaultValue: 'Course deleted successfully' }));
                        } catch (err: any) {
                            Alert.alert(t('error'), err.data?.message || t('deleteFailed', { defaultValue: 'Failed to delete course' }));
                        }
                    }
                }
            ]
        );
    };

    const filteredCourses = useMemo(() => {
        if (!coursesData) return [];
        return coursesData.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (course.instructor as any)?.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "All" || course.status === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, activeFilter, coursesData]);

    const renderItem = ({ item }: { item: any }) => (
        <Card style={styles.courseCard}>
            <View style={styles.courseHeader}>
                <Image source={{ uri: (item as any).thumbnail || "https://picsum.photos/seed/course/200/200" }} style={styles.courseThumb} />
                <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.instructorText}>by {(item.instructor as any)?.name || "Unknown"}</Text>
                </View>
                <View style={[styles.statusBadge, {
                    backgroundColor: item.status === "published" ? COLORS.success + "15" :
                        item.status === "pending" ? COLORS.warning + "15" : COLORS.gray[100]
                }]}>
                    <Text style={[styles.statusText, {
                        color: item.status === "published" ? COLORS.success :
                            item.status === "pending" ? COLORS.warning : COLORS.gray[500]
                    }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.stat}>
                    <Ionicons name="people-outline" size={14} color={COLORS.gray[500]} />
                    <Text style={styles.statText}>{item.students} {t('students')}</Text>
                </View>
                <View style={styles.stat}>
                    <Ionicons name="pricetag-outline" size={14} color={COLORS.gray[400]} />
                    <Text style={styles.statText}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.manageBtn} activeOpacity={0.7} onPress={() => Alert.alert(t('edit'), `Managing ${item.title}`)}>
                    <Text style={styles.manageBtnText}>{t('action', { defaultValue: 'Manage' })}</Text>
                    <Ionicons name="chevron-forward" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.manageBtn, { marginLeft: 12 }]}
                    activeOpacity={0.7}
                    onPress={() => handleDeleteCourse(item._id, item.title)}
                >
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <AdminNavbar title={t('courseManagement')} />
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.gray[400]} />
                    <TextInput
                        placeholder={t('searchCourses')}
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
                keyExtractor={(item: any) => item._id || item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={refetch}
                ListEmptyComponent={() => (
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.gray[400] }}>{t('noCoursesFound')}</Text>
                    </View>
                )}
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
