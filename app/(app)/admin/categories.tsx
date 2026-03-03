import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetCategoriesQuery, useCreateCategoryMutation } from "../../../store/api/categoryApi";

export default function CategoriesScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  const { data: categories, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) {
      Alert.alert(t('error'), t('nameRequired'));
      return;
    }

    try {
      await createCategory({
        name: newCatName,
        description: newCatDesc
      }).unwrap();

      setIsModalVisible(false);
      setNewCatName("");
      setNewCatDesc("");
      Alert.alert(t('success'), t('categoryCreated'));
    } catch (error: any) {
      Alert.alert(t('error'), error.data?.message || "Failed to create category");
    }
  };

  const getRandomColor = (id: string) => {
    const colors = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];
    const index = parseInt(id.substring(0, 2), 16) || 0;
    return colors[index % colors.length];
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8} onPress={() => Alert.alert("View Category", `Viewing courses in ${item.name}`)}>
      <Card style={styles.catCard}>
        <View style={[styles.iconBox, { backgroundColor: getRandomColor(item._id) + "15" }]}>
          <Ionicons name="grid" size={28} color={getRandomColor(item._id)} />
        </View>
        <Text style={styles.catName}>{item.name}</Text>
        <Text style={styles.catCount}>{item.courseCount || 0} {t('courses')}</Text>
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
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text style={styles.addBtnText}>{t('create')}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.secondary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredCategories}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id || item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40, width: '100%' }}>
              <Ionicons name="grid-outline" size={48} color={COLORS.gray[300]} />
              <Text style={{ color: COLORS.gray[500], marginTop: 12, fontSize: 16 }}>{t('noCoursesFound')}</Text>
            </View>
          }
        />
      )}

      {/* Creation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('create')} {t('category')}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('name')}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={t('categoryName')}
                value={newCatName}
                onChangeText={setNewCatName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('description')}</Text>
              <TextInput
                style={[styles.modalInput, { height: 80, textAlignVertical: 'top' }]}
                placeholder={t('categoryDescPlaceholder')}
                multiline={true}
                value={newCatDesc}
                onChangeText={setNewCatDesc}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.submitBtn]}
                onPress={handleCreateCategory}
                disabled={isCreating}
              >
                {isCreating ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.submitBtnText}>{t('confirm')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalCard: {
    padding: 24,
    borderRadius: 24
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 20
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.gray[700],
    marginBottom: 8
  },
  modalInput: {
    backgroundColor: COLORS.gray[50],
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: COLORS.primary
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  modalBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 12
  },
  cancelBtn: {
    backgroundColor: COLORS.gray[100]
  },
  submitBtn: {
    backgroundColor: COLORS.secondary,
    minWidth: 100,
    alignItems: 'center'
  },
  cancelBtnText: {
    color: COLORS.gray[600],
    fontWeight: '700'
  },
  submitBtnText: {
    color: COLORS.white,
    fontWeight: '700'
  }
});
