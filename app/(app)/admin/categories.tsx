import { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Modal, ActivityIndicator, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "../../../store/api/categoryApi";

export default function CategoriesScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatImage, setNewCatImage] = useState("");
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categories, isLoading, refetch } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

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
      if (editingCategory) {
        await updateCategory({
          id: editingCategory._id,
          data: { name: newCatName, description: newCatDesc, image: newCatImage }
        }).unwrap();
        Alert.alert(t('success'), t('categoryUpdated', { defaultValue: 'Category updated successfully' }));
      } else {
        await createCategory({
          name: newCatName,
          description: newCatDesc,
          image: newCatImage
        }).unwrap();
        Alert.alert(t('success'), t('categoryCreated'));
      }

      setIsModalVisible(false);
      setEditingCategory(null);
      setNewCatName("");
      setNewCatDesc("");
      setNewCatImage("");
    } catch (error: any) {
      Alert.alert(t('error'), error.data?.message || "Failed to process category");
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCatName(category.name);
    setNewCatDesc(category.description || "");
    setNewCatImage(category.image || "");
    setIsModalVisible(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(t('error'), 'Permission to access gallery is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setNewCatImage(base64);
    }
  };

  const handleDeleteCategory = (id: string, name: string) => {
    Alert.alert(
      t('confirmDelete', { defaultValue: 'Confirm Delete' }),
      `${t('confirmDeleteCategoryMessage', { defaultValue: 'Are you sure you want to delete the category' })} "${name}"?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCategory(id).unwrap();
              Alert.alert(t('success'), t('categoryDeleted', { defaultValue: 'Category removed successfully' }));
            } catch (error: any) {
              Alert.alert(t('error'), error.data?.message || "Failed to delete category");
            }
          }
        }
      ]
    );
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
        {item.description ? <Text style={styles.catDesc} numberOfLines={1}>{item.description}</Text> : null}
        <Text style={styles.catCount}>{item.courseCount || 0} {t('courses')}</Text>

        <View style={styles.metadataBox}>
          <Text style={styles.metadataText}>_id: {item._id}</Text>
          {item.createdAt && <Text style={styles.metadataText}>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>}
          {item.updatedAt && <Text style={styles.metadataText}>Updated: {new Date(item.updatedAt).toLocaleDateString()}</Text>}
          {item.__v !== undefined && <Text style={styles.metadataText}>__v: {item.__v}</Text>}
        </View>

        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7} onPress={() => handleDeleteCategory(item._id, item.name)}>
          <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={() => handleEditCategory(item)}>
          <Ionicons name="create-outline" size={18} color={COLORS.secondary} />
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
            <Text style={styles.modalTitle}>{editingCategory ? t('edit') : t('create')} {t('category')}</Text>

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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('image')}</Text>
              <View style={styles.imagePickerContainer}>
                {newCatImage ? (
                  <View style={styles.previewWrapper}>
                    <Image source={{ uri: newCatImage }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageBtn}
                      onPress={() => setNewCatImage("")}
                    >
                      <Ionicons name="close-circle" size={24} color={COLORS.danger} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
                    <Ionicons name="image-outline" size={32} color={COLORS.gray[400]} />
                    <Text style={styles.imagePlaceholderText}>{t('uploadImage')}</Text>
                  </TouchableOpacity>
                )}

                <TextInput
                  style={[styles.modalInput, { marginTop: 12 }]}
                  placeholder="https://example.com/image.png"
                  value={newCatImage}
                  onChangeText={setNewCatImage}
                />
                <Text style={styles.helperText}>OR enter Image URL</Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setIsModalVisible(false);
                  setEditingCategory(null);
                  setNewCatName("");
                  setNewCatDesc("");
                  setNewCatImage("");
                }}
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
  catName: { fontSize: 15, fontWeight: "700", color: COLORS.primary, marginBottom: 2 },
  catDesc: { fontSize: 11, color: COLORS.gray[400], marginBottom: 6, textAlign: 'center', paddingHorizontal: 4 },
  catCount: { fontSize: 12, color: COLORS.gray[500], fontWeight: "600" },
  metadataBox: { marginTop: 8, alignItems: 'center' },
  metadataText: { fontSize: 8, color: COLORS.gray[300], marginTop: 2 },
  editBtn: { position: "absolute", top: 12, right: 12 },
  deleteBtn: { position: "absolute", bottom: 12, right: 12 },
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
  },
  imagePickerContainer: {
    backgroundColor: COLORS.gray[50],
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed'
  },
  imagePlaceholder: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[200]
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: COLORS.gray[500],
    marginTop: 8,
    fontWeight: '600'
  },
  previewWrapper: {
    position: 'relative',
    height: 120,
    width: '100%',
    alignItems: 'center'
  },
  imagePreview: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: COLORS.gray[100]
  },
  removeImageBtn: {
    position: 'absolute',
    top: -10,
    right: '32%',
    backgroundColor: COLORS.white,
    borderRadius: 12
  },
  helperText: {
    fontSize: 10,
    color: COLORS.gray[400],
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600'
  }
});
