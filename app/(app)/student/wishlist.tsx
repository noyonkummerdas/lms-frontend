import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";

const MOCK_WISHLIST = [
    { id: 2, title: "Advanced TypeScript", instructor: "Jane Smith", icon: "code-slash", color: "#3178C6", price: "$59.99", rating: 4.9 },
    { id: 4, title: "Fullstack Web Dev", instructor: "Sarah Wilson", icon: "server", color: "#4CAF50", price: "$79.99", rating: 4.6 },
];

export default function WishlistScreen() {
    const router = useRouter();
    const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <Navbar title="My Wishlist" showBack={true} onBackPress={() => router.back()} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {wishlist.length === 0 ? (
                    <View className="flex-1 items-center justify-center mt-[120px]">
                        <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-5 shadow-sm elevation-2">
                            <Ionicons name="heart-outline" size={40} color="#cbd5e1" />
                        </View>
                        <Text className="text-[22px] font-black text-primary">Your Wishlist is Empty</Text>
                        <Text className="text-[14px] text-slate-500 text-center mt-2.5 px-10 leading-[22px]">Save courses you're interested in and they'll appear here.</Text>
                        <Button
                            label="Explore Courses"
                            onPress={() => router.push("/student/explore")}
                            variant="primary"
                            className="mt-8 px-8 h-[50px] rounded-full"
                        />
                    </View>
                ) : (
                    <View className="p-4">
                        <Text className="text-[14px] font-bold text-slate-500 mb-4 ml-1">{wishlist.length} Courses in Wishlist</Text>
                        {wishlist.map((c) => (
                            <Card key={c.id} className="flex-row items-center p-3 mb-4 rounded-2xl">
                                <View
                                    className="w-16 h-16 rounded-2xl items-center justify-center mr-3"
                                    style={{ backgroundColor: c.color + "15" }}
                                >
                                    <Ionicons name={c.icon as any} size={32} color={c.color} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[16px] font-extrabold text-primary" numberOfLines={1}>{c.title}</Text>
                                    <Text className="text-[12px] text-slate-500 mt-0.5">by {c.instructor}</Text>
                                    <View className="flex-row items-center mt-2">
                                        <Text className="text-[15px] font-black text-secondary mr-3">{c.price}</Text>
                                        <View className="flex-row items-center">
                                            <Ionicons name="star" size={14} color="#f59e0b" />
                                            <Text className="text-[13px] font-bold text-primary ml-1">{c.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className="items-center justify-between h-16 ml-2">
                                    <TouchableOpacity
                                        className="p-2"
                                        onPress={() => removeFromWishlist(c.id)}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="p-2"
                                        onPress={() => router.push(`/student/explore`)}
                                    >
                                        <Ionicons name="cart-outline" size={20} color="#6366f1" />
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        ))}
                    </View>
                )}
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
