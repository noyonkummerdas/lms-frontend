import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const USERS_DATA = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Student", status: "Active", avatar: "JD" },
  { id: "2", name: "Jane Smith", email: "jane@test.com", role: "Instructor", status: "Active", avatar: "JS" },
  { id: "3", name: "Mike Ross", email: "mike@ross.com", role: "Student", status: "Inactive", avatar: "MR" },
  { id: "4", name: "Harvey Specter", email: "harvey@specter.com", role: "Instructor", status: "Active", avatar: "HS" },
  { id: "5", name: "Donna Paulsen", email: "donna@test.com", role: "Admin", status: "Active", avatar: "DP" },
];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return USERS_DATA.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: typeof USERS_DATA[0] }) => (
    <Card style={styles.userCard}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{item.role}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === "Active" ? COLORS.success + "20" : COLORS.danger + "20" }]}>
          <Text style={[styles.statusText, { color: item.status === "Active" ? COLORS.success : COLORS.danger }]}>{item.status}</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={() => Alert.alert("Edit User", `Managing settings for ${item.name}`)}>
          <Ionicons name="ellipsis-vertical" size={20} color={COLORS.gray[400]} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title="User Management" />
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray[400]} />
          <TextInput
            placeholder="Search users..."
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
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => Alert.alert("Add User", "Create a new user account")}>
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="people-outline" size={48} color={COLORS.gray[300]} />
            <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>No users found for "{searchQuery}"</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: COLORS.primary },
  searchText: { color: COLORS.gray[400], marginLeft: 8 },
  addBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { padding: 16 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: COLORS.secondary, fontWeight: "700", fontSize: 16 },
  details: { justifyContent: "center" },
  userName: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  userEmail: { fontSize: 13, color: COLORS.gray[500], marginTop: 2 },
  roleBadge: {
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  roleText: { fontSize: 11, fontWeight: "600", color: COLORS.gray[600] },
  actions: { alignItems: "flex-end" },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: { fontSize: 12, fontWeight: "700" },
  editBtn: { padding: 4 },
});
