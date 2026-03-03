import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ScrollView, Image, Modal } from "react-native";
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
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
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

    const handleViewDetails = (course: any) => {
        setSelectedCourse(course);
        setDetailsModalVisible(true);
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
                <TouchableOpacity
                    style={styles.manageBtn}
                    activeOpacity={0.7}
                    onPress={() => handleViewDetails(item)}
                >
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
            />

            {/* Course Details Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={detailsModalVisible}
                onRequestClose={() => setDetailsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('courseDetails', { defaultValue: 'Course Details' })}</Text>
                            <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScroll}>
                            {selectedCourse && (
                                <View style={styles.detailsContainer}>
                                    <Image
                                        source={{ uri: selectedCourse.thumbnail || "https://picsum.photos/seed/course/400/200" }}
                                        style={styles.detailImage}
                                    />

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailLabel}>{t('courseTitle')}</Text>
                                        <Text style={styles.detailValue}>{selectedCourse.title}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailLabel}>{t('instructor')}</Text>
                                        <Text style={styles.detailValue}>{(selectedCourse.instructor as any)?.name || "N/A"}</Text>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailLabel}>{t('category')}</Text>
                                        <Text style={styles.detailValue}>{(selectedCourse.category as any)?.name || "N/A"}</Text>
                                    </View>

                                    <View style={styles.rowSection}>
                                        <View style={[styles.detailSection, { flex: 1 }]}>
                                            <Text style={styles.detailLabel}>{t('price')}</Text>
                                            <Text style={styles.detailValue}>{selectedCourse.price}</Text>
                                        </View>
                                        <View style={[styles.detailSection, { flex: 1 }]}>
                                            <Text style={styles.detailLabel}>{t('status')}</Text>
                                            <View style={[styles.statusBadge, {
                                                alignSelf: 'flex-start',
                                                backgroundColor: selectedCourse.status === "published" ? COLORS.success + "15" :
                                                    selectedCourse.status === "pending" ? COLORS.warning + "15" : COLORS.gray[100]
                                            }]}>
                                                <Text style={[styles.statusText, {
                                                    color: selectedCourse.status === "published" ? COLORS.success :
                                                        selectedCourse.status === "pending" ? COLORS.warning : COLORS.gray[500]
                                                }]}>{selectedCourse.status}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.detailSection}>
                                        <Text style={styles.detailLabel}>{t('description')}</Text>
                                        <Text style={styles.detailDescription}>{selectedCourse.description || "No description provided."}</Text>
                                    </View>

                                    <View style={styles.metaSection}>
                                        <Text style={styles.metaTitle}>System Information</Text>
                                        <View style={styles.metaRow}>
                                            <Text style={styles.metaLabel}>ID:</Text>
                                            <Text style={styles.metaValue}>{selectedCourse._id}</Text>
                                        </View>
                                        <View style={styles.metaRow}>
                                            <Text style={styles.metaLabel}>Created:</Text>
                                            <Text style={styles.metaValue}>{new Date(selectedCourse.createdAt).toLocaleString()}</Text>
                                        </View>
                                        <View style={styles.metaRow}>
                                            <Text style={styles.metaLabel}>Updated:</Text>
                                            <Text style={styles.metaValue}>{new Date(selectedCourse.updatedAt).toLocaleString()}</Text>
                                        </View>
                                        <View style={styles.metaRow}>
                                            <Text style={styles.metaLabel}>Version (__v):</Text>
                                            <Text style={styles.metaValue}>{selectedCourse.__v}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setDetailsModalVisible(false)}
                        >
                            <Text style={styles.closeBtnText}>{t('close', { defaultValue: 'Close' })}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '85%', paddingBottom: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100] },
    modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
    modalScroll: { flex: 1 },
    detailsContainer: { padding: 20 },
    detailImage: { width: '100%', height: 200, borderRadius: 20, marginBottom: 24, backgroundColor: COLORS.gray[50] },
    detailSection: { marginBottom: 20 },
    detailLabel: { fontSize: 12, fontWeight: '700', color: COLORS.gray[400], textTransform: 'uppercase', marginBottom: 6 },
    detailValue: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
    detailDescription: { fontSize: 14, color: COLORS.gray[600], lineHeight: 22 },
    rowSection: { flexDirection: 'row', marginBottom: 20 },
    metaSection: { marginTop: 10, padding: 16, backgroundColor: COLORS.gray[50], borderRadius: 16 },
    metaTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, marginBottom: 12 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    metaLabel: { fontSize: 12, color: COLORS.gray[500], fontWeight: '600' },
    metaValue: { fontSize: 12, color: COLORS.gray[400], fontWeight: '500', fontFamily: 'monospace' },
    closeBtn: { margin: 20, marginTop: 10, backgroundColor: COLORS.primary, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    closeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
});
