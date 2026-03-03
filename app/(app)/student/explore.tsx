import { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useGetCoursesQuery } from "../../../store/api/courseApi";
import { useGetCategoriesQuery } from "../../../store/api/categoryApi";

export default function ExploreScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const sidebar = useSidebar();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses, isLoading: loadingCourses } = useGetCoursesQuery({
    keyword: searchQuery,
    category: activeCategory === "All" ? "" : activeCategory
  });
  const { data: categoriesData } = useGetCategoriesQuery();

  const CATEGORIES = ["All", ...(categoriesData?.map(c => c.name) || [])];

  console.log("[EXPLORE_DEBUG] Courses:", JSON.stringify(courses, null, 2));
  console.log("[EXPLORE_DEBUG] Categories:", JSON.stringify(categoriesData, null, 2));

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      Alert.alert(t('removed'), t('courseRemoved'));
    } else {
      setWishlist(prev => [...prev, id]);
      Alert.alert(t('added'), t('courseAdded'));
    }
  };

  const filteredCourses = courses || [];

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title={t('explore')} showMenu={true} onMenuPress={sidebar?.toggle} />

      <View className="flex-row p-4 items-center">
        <View className="flex-1 flex-row items-center bg-white h-[52px] rounded-2xl px-4 border border-slate-100 mr-3">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            placeholder={t('searchPlaceholder')}
            className="flex-1 ml-2.5 text-[15px] text-primary"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#cbd5e1" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          className="w-[52px] h-[52px] bg-white rounded-2xl items-center justify-center border border-slate-100"
          activeOpacity={0.7}
          onPress={() => Alert.alert(t('filter'), t('filterOptionsComingSoon'))}
        >
          <Ionicons name="options-outline" size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mb-6 flex-grow-0">
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              className={`px-[22px] py-2.5 rounded-full mr-2.5 border border-slate-100 ${activeCategory === cat ? 'bg-secondary border-secondary' : 'bg-white'}`}
              activeOpacity={0.7}
              onPress={() => setActiveCategory(cat)}
            >
              <Text className={`text-[14px] font-bold ${activeCategory === cat ? 'text-white' : 'text-slate-500'}`}>
                {cat === 'All' ? t('all') : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between items-center mx-4 mb-5">
          <Text style={{ fontSize: 18, fontWeight: "900", color: "#1e293b" }}>
            {activeCategory === "All" ? t('recommended') : `${activeCategory} ${t('courses')}`}
          </Text>
          <TouchableOpacity onPress={() => router.push("/student/wishlist")}>
            <Text className="text-[14px] font-bold text-secondary">{t('myWishlist')}</Text>
          </TouchableOpacity>
        </View>

        {loadingCourses ? (
          <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 40 }} />
        ) : filteredCourses.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-[60px] px-10">
            <Ionicons name="search-outline" size={64} color="#e2e8f0" />
            <Text className="text-[22px] font-black text-primary mt-5 text-center">{t('noResults')}</Text>
            <Text className="text-[14px] text-slate-400 text-center mt-2 leading-[22px]">{t('noResultsSubtitle')}</Text>
            <TouchableOpacity
              className="mt-6 px-8 py-3.5 bg-primary rounded-2xl"
              onPress={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              <Text className="text-white font-black">{t('resetFilters')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredCourses.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => router.push({
                pathname: `/courses/${c.id}`,
                params: {
                  price: c.price?.toString(),
                  instructor: typeof c.instructor === 'string' ? c.instructor : (c.instructor as any)?.name,
                  title: c.title,
                  image: (c as any).image,
                  color: (c as any).color
                }
              } as any)}
              activeOpacity={0.8}
            >
              <Card className="mx-4 mb-4 flex-row items-center p-3.5 rounded-[20px]">
                <View className="w-[78px] h-[78px] rounded-[18px] bg-slate-100 overflow-hidden mr-3.5">
                  {(c as any).image ? (
                    <Image source={{ uri: (c as any).image }} className="w-full h-full" resizeMode="cover" />
                  ) : (
                    <View className="w-full h-full items-center justify-center bg-secondary/10">
                      <Ionicons name="book-outline" size={32} color="#6366f1" />
                    </View>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-[16px] font-extrabold text-primary" numberOfLines={1}>{c.title}</Text>
                  <Text className="text-[13px] text-slate-400 mt-0.5 font-semibold">{t('by')} {typeof c.instructor === 'string' ? c.instructor : (c.instructor as any)?.name}</Text>
                  <View className="flex-row justify-between items-center mt-2.5">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#f59e0b" />
                      <Text className="text-[13px] font-bold text-primary ml-1">{c.rating || 0}</Text>
                    </View>
                    <Text className="text-[16px] font-black text-secondary">${c.price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="p-2 ml-1"
                  onPress={() => toggleWishlist(c.id)}
                >
                  <Ionicons
                    name={wishlist.includes(c.id) ? "heart" : "heart-outline"}
                    size={24}
                    color={wishlist.includes(c.id) ? "#ef4444" : "#cbd5e1"}
                  />
                </TouchableOpacity>
              </Card>
            </TouchableOpacity>
          ))
        )}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
