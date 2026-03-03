import { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "../../../store/api/userApi";
import { User } from "../../../types/User";

export default function UsersScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState((params.role as string) || "");

  useEffect(() => {
    if (params.role) {
      setSearchQuery(params.role as string);
    }
  }, [params.role]);

  const { data: usersData, isLoading, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  console.log("[USERS_DEBUG] Fetched Users:", JSON.stringify(usersData, null, 2));

  const filteredUsers = useMemo(() => {
    if (!usersData) return [];
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, usersData]);

  const toggleUserStatus = (id: string, currentStatus: string, name: string) => {
    const isDeactivating = currentStatus === "Active" || currentStatus === "active";
    const newStatus = isDeactivating ? "inactive" : "active";

    Alert.alert(
      isDeactivating ? t('deactivateUser') : t('activateUser'),
      isDeactivating ? t('confirmDeactivate', { name }) : t('confirmActivate', { name }),
      [
        { text: t('cancel'), style: "cancel" },
        {
          text: isDeactivating ? t('deactivate') : t('activate'),
          style: isDeactivating ? "destructive" : "default",
          onPress: async () => {
            try {
              await updateUser({ id, data: { status: newStatus } }).unwrap();
              Alert.alert(t('success'), t('userStatusUpdated', { name, status: t(newStatus === 'active' ? 'activeStatus' : 'inactiveStatus') }));
            } catch (err) {
              console.error("[USERS_DEBUG] Update Status Failed:", err);
              Alert.alert(t('error'), t('error_updating_status', { defaultValue: 'Failed to update user status' }));
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: User | any }) => (
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
            <View style={[styles.statusBadge, { backgroundColor: item.status === "Active" || item.status === "active" ? COLORS.success + "15" : COLORS.danger + "15" }]}>
              <Text style={[styles.statusText, { color: item.status === "Active" || item.status === "active" ? COLORS.success : COLORS.danger }]}>
                {t(item.status === 'Active' || item.status === 'active' ? 'activeStatus' : 'inactiveStatus')}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: item.status === "Active" || item.status === "active" ? COLORS.danger + "10" : COLORS.success + "10" }]}
          onPress={() => toggleUserStatus(item._id || item.id || "", item.status, item.name)}
        >
          <Ionicons
            name={item.status === "Active" || item.status === "active" ? "person-remove-outline" : "person-add-outline"}
            size={20}
            color={item.status === "Active" || item.status === "active" ? COLORS.danger : COLORS.success}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title={t('userManagement')} />
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray[400]} />
          <TextInput
            placeholder={t('searchUsers')}
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
        keyExtractor={(item: any) => item._id || item.id || Math.random().toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ color: COLORS.gray[400] }}>{t('noUsersFound')}</Text>
          </View>
        )}
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
