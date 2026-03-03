import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const CATEGORIES = [
  { id: "1", name: "Development", count: 12, icon: "code-slash", color: "#3B82F6" },
  { id: "2", name: "Design", count: 8, icon: "color-palette", color: "#EC4899" },
  { id: "3", name: "Business", count: 5, icon: "briefcase", color: "#10B981" },
  { id: "4", name: "Marketing", count: 7, icon: "megaphone", color: "#F59E0B" },
  { id: "5", name: "Music", count: 3, icon: "musical-notes", color: "#8B5CF6" },
  { id: "6", name: "Health", count: 4, icon: "heart", color: "#EF4444" },
];

export default function CategoriesScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => Alert.alert("View Category", `Viewing courses in ${item.name}`)}>
      <Card style={styles.catCard}>
        <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
          <Ionicons name={item.icon as any} size={28} color={item.color} />
        </View>
        <Text style={styles.catName}>{item.name}</Text>
        <Text style={styles.catCount}>{item.count} {t('courses')}</Text>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={() => Alert.alert(t('edit'), `Managing ${item.name}`)}>
          <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.gray[400]} />
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title={t('categoryManagement')} />
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.gray[400]} />
          <TextInput
            placeholder={t('searchPlaceholder')}
            style={styles.searchInput}
            placeholderTextColor={COLORS.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => Alert.alert(t('create'), "Create a new course category")}>
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.addBtnText}>{t('create')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={(item: any) => item._id || item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40, width: '100%' }}>
            <Ionicons name="grid-outline" size={48} color={COLORS.gray[300]} />
            <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>{t('noCoursesFound')}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white
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
  title: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  addBtnText: { color: COLORS.white, fontWeight: "700", marginLeft: 4, fontSize: 13 },
  list: { padding: 8 },
  gridItem: { flex: 0.5, padding: 8 },
  catCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    position: "relative",
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  catName: { fontSize: 15, fontWeight: "700", color: COLORS.primary, marginBottom: 4 },
  catCount: { fontSize: 12, color: COLORS.gray[500], fontWeight: "600" },
  editBtn: { position: "absolute", top: 12, right: 12 },
});
