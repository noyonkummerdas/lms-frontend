import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const ROLES_DATA = [
    { id: "1", title: "Administrator", users: 5, permissions: "Full Access", color: COLORS.danger },
    { id: "2", title: "Instructor", users: 24, permissions: "Course Management, Analytics", color: COLORS.secondary },
    { id: "3", title: "Student", users: 1250, permissions: "Course Access, Community", color: COLORS.success },
    { id: "4", title: "Editor", users: 8, permissions: "Content Editing, Categories", color: COLORS.warning },
];

export default function RolesScreen() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRoles = useMemo(() => {
        return ROLES_DATA.filter(role =>
            role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.permissions.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleEdit = (role: string) => {
        Alert.alert("Edit Role", `Editing permissions for: ${role}`);
    };

    const renderItem = ({ item }: { item: typeof ROLES_DATA[0] }) => (
        <Card style={styles.roleCard}>
            <View style={styles.roleHeader}>
                <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
                    <Ionicons name="shield-checkmark" size={24} color={item.color} />
                </View>
                <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>{item.title}</Text>
                    <Text style={styles.userCount}>{item.users} Active Users</Text>
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
                <Text style={styles.permLabel}>Primary Permissions:</Text>
                <Text style={styles.permValue}>{item.permissions}</Text>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <AdminNavbar title="Role Management" />
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color={COLORS.gray[400]} />
                    <TextInput
                        placeholder="Search roles..."
                        style={styles.searchInput}
                        placeholderTextColor={COLORS.gray[400]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => Alert.alert("Add Role", "Define a new system role")}>
                    <Ionicons name="add" size={20} color={COLORS.white} />
                    <Text style={styles.addBtnText}>New</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredRoles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Ionicons name="shield-outline" size={48} color={COLORS.gray[300]} />
                        <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>No roles found</Text>
                    </View>
                }
            />
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
