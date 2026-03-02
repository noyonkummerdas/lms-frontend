import { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";

const CATEGORIES = ["All", "Development", "Design", "Business", "Marketing", "Music"];

const INITIAL_COURSES = [
  { id: 1, title: "React Native Basics", instructor: "John Doe", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", color: "#61DAFB", price: "$49.99", rating: 4.8, category: "Development" },
  { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80", color: "#3178C6", price: "$59.99", rating: 4.9, category: "Development" },
  { id: 3, title: "Mobile App Design", instructor: "Mike Johnson", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&q=80", color: "#FF6B6B", price: "$39.99", rating: 4.7, category: "Design" },
  { id: 4, title: "Fullstack Web Dev", instructor: "Sarah Wilson", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80", color: "#4CAF50", price: "$79.99", rating: 4.6, category: "Development" },
  { id: 5, title: "Business Strategy", instructor: "Alex Brown", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", color: "#FF9800", price: "$69.99", rating: 4.5, category: "Business" },
  { id: 6, title: "Digital Marketing", instructor: "Emily Davis", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?w=800&q=80", color: "#E91E63", price: "$44.99", rating: 4.4, category: "Marketing" },
];

export default function ExploreScreen() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [wishlist, setWishlist] = useState<number[]>([2, 4]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      Alert.alert("Removed", "Course removed from your wishlist.");
    } else {
      setWishlist(prev => [...prev, id]);
      Alert.alert("Added", "Course added to your wishlist!");
    }
  };

  const filteredCourses = useMemo(() => {
    return INITIAL_COURSES.filter(course => {
      const matchCategory = activeCategory === "All" || course.category === activeCategory;
      const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <Navbar title="Explore" showMenu={true} onMenuPress={sidebar?.toggle} />

      <View className="flex-row p-4 items-center">
        <View className="flex-1 flex-row items-center bg-white h-[52px] rounded-2xl px-4 border border-slate-100 mr-3">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search for courses..."
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
          onPress={() => Alert.alert("Filter", "Filter options coming soon!")}
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
              <Text className={`text-[14px] font-bold ${activeCategory === cat ? 'text-white' : 'text-slate-500'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between items-center mx-4 mb-5">
          <Text className="text-[18px] font-black text-primary">
            {activeCategory === "All" ? "Recommended for you" : `${activeCategory} Courses`}
          </Text>
          <TouchableOpacity onPress={() => router.push("/student/wishlist")}>
            <Text className="text-[14px] font-bold text-secondary">My Wishlist</Text>
          </TouchableOpacity>
        </View>

        {filteredCourses.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-[60px] px-10">
            <Ionicons name="search-outline" size={64} color="#e2e8f0" />
            <Text className="text-[22px] font-black text-primary mt-5 text-center">No Results Found</Text>
            <Text className="text-[14px] text-slate-400 text-center mt-2 leading-[22px]">We couldn't find any courses matching your criteria.</Text>
            <TouchableOpacity
              className="mt-6 px-8 py-3.5 bg-primary rounded-2xl"
              onPress={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              <Text className="text-white font-black">Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredCourses.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => router.push({
                pathname: `/courses/${c.id}`,
                params: {
                  price: c.price,
                  instructor: c.instructor,
                  title: c.title,
                  image: c.image,
                  color: c.color
                }
              } as any)}
              activeOpacity={0.8}
            >
              <Card className="mx-4 mb-4 flex-row items-center p-3.5 rounded-[20px]">
                <View className="w-[78px] h-[78px] rounded-[18px] bg-slate-100 overflow-hidden mr-3.5">
                  <Image source={{ uri: c.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <View className="flex-1">
                  <Text className="text-[16px] font-extrabold text-primary" numberOfLines={1}>{c.title}</Text>
                  <Text className="text-[13px] text-slate-400 mt-0.5 font-semibold">by {c.instructor}</Text>
                  <View className="flex-row justify-between items-center mt-2.5">
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#f59e0b" />
                      <Text className="text-[13px] font-bold text-primary ml-1">{c.rating}</Text>
                    </View>
                    <Text className="text-[16px] font-black text-secondary">{c.price}</Text>
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
