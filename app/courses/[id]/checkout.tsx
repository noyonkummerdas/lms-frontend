import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

const PAYMENT_METHODS = [
    { id: "bkash", name: "bKash", icon: "https://i.ibb.co/S7n9zPj/bkash.png", fee: "0.00" },
    { id: "nogod", name: "Nagad", icon: "https://i.ibb.co/9vV4M4Q/nagad.png", fee: "0.00" },
    { id: "rocket", name: "Rocket", icon: "https://i.ibb.co/mR4S3mH/rocket.png", fee: "0.00" },
    { id: "card", name: "Credit/Debit Card", icon: "https://i.ibb.co/3mN9R0H/cards-logo.png", fee: "1.50" },
];

export default function CheckoutScreen() {
    const router = useRouter();
    const { id, title, price } = useLocalSearchParams<{ id: string; title: string; price: string }>();
    const [selectedMethod, setSelectedMethod] = useState("bkash");
    const [coupon, setCoupon] = useState("");
    const [isApplied, setIsApplied] = useState(false);
    const [plan, setPlan] = useState("onetime"); // 'onetime' or 'subscription'
    const [isProcessing, setIsProcessing] = useState(false);

    const numericPrice = parseFloat((price || "$49.99").replace("$", ""));
    const discount = isApplied ? numericPrice * 0.2 : 0;
    const selectedPayment = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    const fee = parseFloat(selectedPayment?.fee || "0");
    const subtotal = plan === "onetime" ? numericPrice : 15.99; // Mock monthly price
    const total = subtotal - discount + fee;

    const applyCoupon = () => {
        if (coupon.toUpperCase() === "SAVE20") {
            setIsApplied(true);
            Alert.alert("Success", "Coupon applied! You got 20% off.");
        } else {
            Alert.alert("Error", "Invalid coupon code.");
        }
    };

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate payment API call
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert(
                "Payment Successful",
                "Your payment has been processed. You can now start learning!",
                [
                    {
                        text: "Start Learning",
                        onPress: () => router.replace({
                            pathname: "/courses/[id]/learn",
                            params: { id, title }
                        } as any)
                    }
                ]
            );
        }, 2500);
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="Secure Checkout" showBack={true} onBackPress={() => router.back()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Subscription Model */}
                <Text style={styles.sectionTitle}>Select Purchase Type</Text>
                <View style={styles.planContainer}>
                    <TouchableOpacity
                        style={[styles.planCard, plan === "onetime" && styles.planActive]}
                        onPress={() => setPlan("onetime")}
                    >
                        <Ionicons name="cart" size={20} color={plan === "onetime" ? COLORS.secondary : COLORS.gray[400]} />
                        <Text style={[styles.planLabel, plan === "onetime" && styles.planLabelActive]}>One-time Buy</Text>
                        <Text style={styles.planPrice}>{price || "$49.99"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.planCard, plan === "subscription" && styles.planActive]}
                        onPress={() => setPlan("subscription")}
                    >
                        <Ionicons name="calendar" size={20} color={plan === "subscription" ? COLORS.secondary : COLORS.gray[400]} />
                        <Text style={[styles.planLabel, plan === "subscription" && styles.planLabelActive]}>LMS Monthly</Text>
                        <Text style={styles.planPrice}>$15.99/mo</Text>
                    </TouchableOpacity>
                </View>

                {/* Coupon System */}
                <View style={styles.couponSection}>
                    <Text style={styles.sectionTitle}>Have a Coupon?</Text>
                    <View style={styles.couponInputRow}>
                        <TextInput
                            placeholder="Enter code (e.g. SAVE20)"
                            style={styles.couponInput}
                            value={coupon}
                            onChangeText={setCoupon}
                            autoCapitalize="characters"
                        />
                        <TouchableOpacity style={styles.applyBtn} onPress={applyCoupon}>
                            <Text style={styles.applyBtnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Summary */}
                <Text style={styles.sectionTitle}>Order Summary</Text>
                <Card style={styles.orderCard}>
                    <View style={styles.courseRow}>
                        <View style={styles.courseIconBox}>
                            <Ionicons name="book" size={24} color={COLORS.secondary} />
                        </View>
                        <View style={styles.courseDetails}>
                            <Text style={styles.courseTitle} numberOfLines={1}>{title || "Premium Course"}</Text>
                            <Text style={styles.courseSub}>{plan === "onetime" ? "Lifetime Access" : "Full Access Subscription"}</Text>
                        </View>
                        <Text style={styles.itemPrice}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal</Text>
                        <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    {isApplied && (
                        <View style={styles.billRow}>
                            <Text style={[styles.billLabel, { color: COLORS.success }]}>Discount (SAVE20)</Text>
                            <Text style={[styles.billValue, { color: COLORS.success }]}>-${discount.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Platform Fee</Text>
                        <Text style={styles.billValue}>${fee.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.billRow, { marginTop: 8 }]}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </Card>

                {/* Payment Methods */}
                <Text style={styles.sectionTitle}>Select Payment Method</Text>
                <View style={styles.methodsGrid}>
                    {PAYMENT_METHODS.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[styles.methodCard, selectedMethod === method.id && styles.methodActive]}
                            onPress={() => setSelectedMethod(method.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.methodIconContainer}>
                                <Image source={{ uri: method.icon }} style={styles.methodLogo} resizeMode="contain" />
                            </View>
                            <Text style={[styles.methodName, selectedMethod === method.id && styles.methodNameActive]}>{method.name}</Text>
                            {selectedMethod === method.id && (
                                <View style={styles.checkBadge}>
                                    <Ionicons name="checkmark" size={12} color={COLORS.white} />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Info Box */}
                <View style={styles.securityBox}>
                    <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
                    <Text style={styles.securityText}>Your payment is encrypted and 100% secure.</Text>
                </View>

                {/* Action Button */}
                <Button
                    label={`Pay $${total.toFixed(2)} with ${selectedPayment?.name}`}
                    onPress={handlePayment}
                    loading={isProcessing}
                    variant="primary"
                    style={styles.payBtn}
                />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    scroll: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 16, marginLeft: 4 },
    orderCard: { padding: 20, marginBottom: 24, borderRadius: 24 },
    courseRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    courseIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.secondary + "15", alignItems: "center", justifyContent: "center", marginRight: 12 },
    courseDetails: { flex: 1 },
    courseTitle: { fontSize: 15, fontWeight: "800", color: COLORS.primary },
    courseSub: { fontSize: 12, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
    itemPrice: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    divider: { height: 1, backgroundColor: COLORS.gray[50], marginVertical: 16 },
    billRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    billLabel: { fontSize: 14, color: COLORS.gray[500], fontWeight: "600" },
    billValue: { fontSize: 14, color: COLORS.primary, fontWeight: "700" },
    totalLabel: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    totalValue: { fontSize: 18, fontWeight: "900", color: COLORS.secondary },
    planContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24, marginHorizontal: -4 },
    planCard: { flex: 1, marginHorizontal: 4, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 2, borderColor: "transparent" },
    planActive: { borderColor: COLORS.secondary, backgroundColor: COLORS.secondary + "05" },
    planLabel: { fontSize: 13, fontWeight: "700", color: COLORS.gray[500], marginTop: 8 },
    planLabelActive: { color: COLORS.secondary },
    planPrice: { fontSize: 14, fontWeight: "800", color: COLORS.primary, marginTop: 4 },
    couponSection: { marginBottom: 24 },
    couponInputRow: { flexDirection: "row", alignItems: "center" },
    couponInput: { flex: 1, backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.gray[200], fontSize: 14, color: COLORS.primary, fontWeight: "600" },
    applyBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginLeft: 10 },
    applyBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },

    methodsGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -8, marginBottom: 24 },
    methodCard: { width: "46%", margin: "2%", backgroundColor: COLORS.white, borderRadius: 20, padding: 16, alignItems: "center", borderWidth: 2, borderColor: "transparent", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    methodActive: { borderColor: COLORS.secondary, backgroundColor: COLORS.secondary + "05" },
    methodIconContainer: { width: "100%", height: 40, justifyContent: "center", alignItems: "center", marginBottom: 10 },
    methodLogo: { width: 60, height: 32 },
    methodName: { fontSize: 12, fontWeight: "700", color: COLORS.gray[500] },
    methodNameActive: { color: COLORS.secondary },
    checkBadge: { position: "absolute", top: 8, right: 8, backgroundColor: COLORS.secondary, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },

    securityBox: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 32 },
    securityText: { marginLeft: 8, fontSize: 12, color: COLORS.gray[400], fontWeight: "600" },
    payBtn: { height: 56, borderRadius: 18, elevation: 4, shadowColor: COLORS.secondary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 8 },
});
