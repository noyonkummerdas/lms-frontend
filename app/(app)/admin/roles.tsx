import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetUsersQuery } from "../../../store/api/userApi";

export default function RolesScreen() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");

    const { data: users, isLoading } = useGetUsersQuery();

    const ROLES_DATA = useMemo(() => {
        const counts = {
            admin: 0,
            instructor: 0,
            student: 0
        };

        if (users && Array.isArray(users)) {
            users.forEach((user: any) => {
                if (counts[user.role as keyof typeof counts] !== undefined) {
                    counts[user.role as keyof typeof counts]++;
                }
            });
        }

        return [
            { id: "1", role: "admin", title: "administrator", users: counts.admin, permissions: "Full Access", color: COLORS.danger },
            { id: "2", role: "instructor", title: "instructor", users: counts.instructor, permissions: "Course Management, Analytics", color: COLORS.secondary },
            { id: "3", role: "student", title: "student", users: counts.student, permissions: "Course Access, Community", color: COLORS.success },
        ];
    }, [users]);

    const filteredRoles = useMemo(() => {
        return ROLES_DATA.filter(role =>
            t(role.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.permissions.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, ROLES_DATA, t]);

    const handleEdit = (role: string) => {
        Alert.alert(t('edit'), `${t('edit')} ${t(role)}`);
    };

    const renderItem = ({ item }: { item: typeof ROLES_DATA[0] }) => (
        <Card style={styles.roleCard}>
            <View style={styles.roleHeader}>
                <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
                    <Ionicons name="shield-checkmark" size={24} color={item.color} />
                </View>
                <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>{t(item.title)}</Text>
                    <Text style={styles.userCount}>{item.users} {t('activeUsers')}</Text>
                </View>
                <TouchableOpacity
                    style={styles.editBtn}
                    activeOpacity={0.7}
                    onPress={() => handleEdit(item.title)}
                >
                    <Ionicons name="settings-outline" size={20} color={COLORS.gray[400]} />
                </TouchableOpacity>
            </View>

            <View style={styles.permissionsRow}>
                <Text style={styles.permLabel}>{t('primaryPermissions')}</Text>
                <Text style={styles.permValue}>{item.permissions}</Text>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <AdminNavbar title={t('roleManagement')} />
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color={COLORS.gray[400]} />
                    <TextInput
                        placeholder={t('searchRoles')}
                        style={styles.searchInput}
                        placeholderTextColor={COLORS.gray[400]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => Alert.alert(t('create'), t('defineNewRole', { defaultValue: 'Define a new system role' }))}>
                    <Ionicons name="add" size={20} color={COLORS.white} />
                    <Text style={styles.addBtnText}>{t('create')}</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.secondary} />
                </View>
            ) : (
                <FlatList
                    data={filteredRoles}
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 40 }}>
                            <Ionicons name="shield-outline" size={48} color={COLORS.gray[300]} />
                            <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>{t('noResults')}</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.gray[50],
        paddingHorizontal: 12,
        height: 48,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: COLORS.primary },
    subtitle: { fontSize: 13, color: COLORS.gray[500], fontWeight: "600" },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10
    },
    addBtnText: { color: COLORS.white, fontWeight: "700", marginLeft: 4, fontSize: 13 },
    list: { padding: 16 },
    roleCard: { marginBottom: 16, padding: 16 },
    roleHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 16 },
    roleInfo: { flex: 1 },
    roleTitle: { fontSize: 17, fontWeight: "800", color: COLORS.primary },
    userCount: { fontSize: 13, color: COLORS.gray[500], marginTop: 2 },
    editBtn: { padding: 4 },
    permissionsRow: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray[50]
    },
    permLabel: { fontSize: 12, fontWeight: "700", color: COLORS.gray[400], textTransform: "uppercase" },
    permValue: { fontSize: 14, color: COLORS.primary, marginTop: 4, fontWeight: "500" },
});
