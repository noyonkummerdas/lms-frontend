import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

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
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="My Wishlist" showBack={true} onBackPress={() => router.back()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {wishlist.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconCircle}>
                            <Ionicons name="heart-outline" size={40} color={COLORS.gray[300]} />
                        </View>
                        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
                        <Text style={styles.emptySub}>Save courses you're interested in and they'll appear here.</Text>
                        <Button
                            label="Explore Courses"
                            onPress={() => router.push("/student/explore")}
                            variant="primary"
                            style={styles.exploreBtn}
                        />
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        <Text style={styles.countText}>{wishlist.length} Courses in Wishlist</Text>
                        {wishlist.map((c) => (
                            <Card key={c.id} style={styles.card}>
                                <View style={[styles.iconBox, { backgroundColor: c.color + "15" }]}>
                                    <Ionicons name={c.icon as any} size={32} color={c.color} />
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.courseTitle} numberOfLines={1}>{c.title}</Text>
                                    <Text style={styles.instructor}>by {c.instructor}</Text>
                                    <View style={styles.metaRow}>
                                        <Text style={styles.price}>{c.price}</Text>
                                        <View style={styles.ratingInfo}>
                                            <Ionicons name="star" size={14} color={COLORS.warning} />
                                            <Text style={styles.ratingText}>{c.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.actions}>
                                    <TouchableOpacity
                                        style={styles.removeBtn}
                                        onPress={() => removeFromWishlist(c.id)}
                                    >
                                        <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buyBtn}
                                        onPress={() => router.push(`/student/explore`)}
                                    >
                                        <Ionicons name="cart-outline" size={20} color={COLORS.secondary} />
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        ))}
                    </View>
                )}
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    scroll: { flex: 1 },
    listContainer: { padding: 16 },
    countText: { fontSize: 14, fontWeight: "700", color: COLORS.gray[500], marginBottom: 16, marginLeft: 4 },
    card: { flexDirection: "row", alignItems: "center", padding: 12, marginBottom: 16 },
    iconBox: { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 12 },
    info: { flex: 1 },
    courseTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    instructor: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
    metaRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    price: { fontSize: 15, fontWeight: "900", color: COLORS.secondary, marginRight: 12 },
    ratingInfo: { flexDirection: "row", alignItems: "center" },
    ratingText: { fontSize: 13, fontWeight: "700", color: COLORS.primary, marginLeft: 4 },
    actions: { alignItems: "center", justifyContent: "space-between", height: 64, marginLeft: 8 },
    removeBtn: { padding: 8 },
    buyBtn: { padding: 8 },
    emptyState: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 120 },
    emptyIconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white, alignItems: "center", justifyContent: "center", marginBottom: 20, elevation: 2 },
    emptyTitle: { fontSize: 22, fontWeight: "900", color: COLORS.primary },
    emptySub: { fontSize: 14, color: COLORS.gray[500], textAlign: "center", marginTop: 10, paddingHorizontal: 40, lineHeight: 22 },
    exploreBtn: { marginTop: 32, paddingHorizontal: 32, height: 50, borderRadius: 25 },
});
