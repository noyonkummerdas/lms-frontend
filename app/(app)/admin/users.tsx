import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const INITIAL_USERS = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Student", status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Jane Smith", email: "jane@test.com", role: "Instructor", status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Mike Ross", email: "mike@ross.com", role: "Student", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Harvey Specter", email: "harvey@specter.com", role: "Instructor", status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Donna Paulsen", email: "donna@test.com", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/150?u=5" },
];

export default function UsersScreen() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const toggleUserStatus = (id: string, currentStatus: string, name: string) => {
    const isDeactivating = currentStatus === "Active";
    Alert.alert(
      isDeactivating ? "Deactivate User" : "Activate User",
      `Are you sure you want to ${isDeactivating ? "deactivate" : "activate"} ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: isDeactivating ? "Deactivate" : "Activate",
          style: isDeactivating ? "destructive" : "default",
          onPress: () => {
            setUsers(prev => prev.map(u =>
              u.id === id ? { ...u, status: isDeactivating ? "Inactive" : "Active" } : u
            ));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: typeof INITIAL_USERS[0] }) => (
    <Card style={styles.userCard}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: item.avatar }}
          style={[styles.avatar, item.status === "Inactive" && { opacity: 0.5 }]}
        />
        <View style={styles.details}>
          <View style={styles.nameRow}>
            <Text style={[styles.userName, item.status === "Inactive" && styles.inactiveText]}>{item.name}</Text>
            {item.status === "Inactive" && (
              <Ionicons name="lock-closed" size={12} color={COLORS.danger} style={{ marginLeft: 6 }} />
            )}
          </View>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.roleRow}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{item.role}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: item.status === "Active" ? COLORS.success + "15" : COLORS.danger + "15" }]}>
              <Text style={[styles.statusText, { color: item.status === "Active" ? COLORS.success : COLORS.danger }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: item.status === "Active" ? COLORS.danger + "10" : COLORS.success + "10" }]}
          onPress={() => toggleUserStatus(item.id, item.status, item.name)}
        >
          <Ionicons
            name={item.status === "Active" ? "person-remove-outline" : "person-add-outline"}
            size={20}
            color={item.status === "Active" ? COLORS.danger : COLORS.success}
          />
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
        </View>
      </View>

      <FlatList
        data={filteredUsers}
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
  header: { paddingHorizontal: 16, paddingVertical: 14, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100] },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.gray[50], paddingHorizontal: 16, height: 50, borderRadius: 16, borderWidth: 1, borderColor: COLORS.gray[100] },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: COLORS.primary },
  list: { padding: 16 },
  userCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, marginBottom: 12, borderRadius: 20 },
  userInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: { width: 56, height: 56, borderRadius: 20, marginRight: 16, backgroundColor: COLORS.gray[100] },
  details: { flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  userName: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  inactiveText: { color: COLORS.gray[400], textDecorationLine: "line-through" },
  userEmail: { fontSize: 13, color: COLORS.gray[400], marginTop: 2, fontWeight: "500" },
  roleRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  roleBadge: { backgroundColor: COLORS.gray[100], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 8 },
  roleText: { fontSize: 10, fontWeight: "800", color: COLORS.gray[600], textTransform: "uppercase" },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: "900", textTransform: "uppercase" },
  actions: { flexDirection: "row", alignItems: "center" },
  actionBtn: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
});
