import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";

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
    const [plan, setPlan] = useState("onetime");
    const [isProcessing, setIsProcessing] = useState(false);

    const numericPrice = parseFloat((price || "$49.99").replace("$", ""));
    const discount = isApplied ? numericPrice * 0.2 : 0;
    const selectedPayment = PAYMENT_METHODS.find(m => m.id === selectedMethod);
    const fee = parseFloat(selectedPayment?.fee || "0");
    const subtotal = plan === "onetime" ? numericPrice : 15.99;
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
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <Navbar title="Secure Checkout" showBack={true} onBackPress={() => router.back()} />

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <Text className="text-[16px] font-extrabold text-primary mb-4 ml-1 mt-4">Select Purchase Type</Text>
                <View className="flex-row mb-6 mx-[-4px]">
                    <TouchableOpacity
                        className={`flex-1 mx-1 bg-white rounded-2xl p-4 items-center border-2 ${plan === "onetime" ? 'border-secondary bg-indigo-50/5' : 'border-transparent'}`}
                        onPress={() => setPlan("onetime")}
                    >
                        <Ionicons name="cart" size={20} color={plan === "onetime" ? "#6366f1" : "#94a3b8"} />
                        <Text className={`text-[13px] font-bold mt-2 ${plan === "onetime" ? 'text-secondary' : 'text-slate-500'}`}>One-time Buy</Text>
                        <Text className="text-[14px] font-extrabold text-primary mt-1">{price || "$49.99"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`flex-1 mx-1 bg-white rounded-2xl p-4 items-center border-2 ${plan === "subscription" ? 'border-secondary bg-indigo-50/5' : 'border-transparent'}`}
                        onPress={() => setPlan("subscription")}
                    >
                        <Ionicons name="calendar" size={20} color={plan === "subscription" ? "#6366f1" : "#94a3b8"} />
                        <Text className={`text-[13px] font-bold mt-2 ${plan === "subscription" ? 'text-secondary' : 'text-slate-500'}`}>LMS Monthly</Text>
                        <Text className="text-[14px] font-extrabold text-primary mt-1">$15.99/mo</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-6">
                    <Text className="text-[16px] font-extrabold text-primary mb-4 ml-1">Have a Coupon?</Text>
                    <View className="flex-row items-center">
                        <TextInput
                            placeholder="Enter code (e.g. SAVE20)"
                            className="flex-1 bg-white rounded-xl px-4 py-3 border border-slate-200 text-[14px] text-primary font-semibold"
                            value={coupon}
                            onChangeText={setCoupon}
                            autoCapitalize="characters"
                        />
                        <TouchableOpacity className="bg-primary px-5 py-3 rounded-xl ml-2.5" onPress={applyCoupon}>
                            <Text className="text-white font-bold text-[14px]">Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-[16px] font-extrabold text-primary mb-4 ml-1">Order Summary</Text>
                <Card className="p-5 mb-6 rounded-3xl">
                    <View className="flex-row items-center mb-4">
                        <View className="w-11 h-11 rounded-xl bg-secondary/15 items-center justify-center mr-3">
                            <Ionicons name="book" size={24} color="#6366f1" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[15px] font-extrabold text-primary" numberOfLines={1}>{title || "Premium Course"}</Text>
                            <Text className="text-[12px] text-slate-400 mt-0.5 font-semibold">{plan === "onetime" ? "Lifetime Access" : "Full Access Subscription"}</Text>
                        </View>
                        <Text className="text-[16px] font-extrabold text-primary">${subtotal.toFixed(2)}</Text>
                    </View>
                    <View className="h-[1px] bg-slate-50 my-4" />
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[14px] text-slate-500 font-semibold">Subtotal</Text>
                        <Text className="text-[14px] text-primary font-bold">${subtotal.toFixed(2)}</Text>
                    </View>
                    {isApplied && (
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-[14px] text-success font-semibold">Discount (SAVE20)</Text>
                            <Text className="text-[14px] text-success font-bold">-${discount.toFixed(2)}</Text>
                        </View>
                    )}
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[14px] text-slate-500 font-semibold">Platform Fee</Text>
                        <Text className="text-[14px] text-primary font-bold">${fee.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between mt-2">
                        <Text className="text-[16px] font-extrabold text-primary">Total Amount</Text>
                        <Text className="text-[18px] font-black text-secondary">${total.toFixed(2)}</Text>
                    </View>
                </Card>

                <Text className="text-[16px] font-extrabold text-primary mb-4 ml-1">Select Payment Method</Text>
                <View className="flex-row flex-wrap mx-[-8px] mb-6">
                    {PAYMENT_METHODS.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            className={`w-[46%] m-[2%] bg-white rounded-[20px] p-4 items-center border-2 shadow-sm elevation-2 ${selectedMethod === method.id ? 'border-secondary bg-indigo-50/5' : 'border-transparent'}`}
                            onPress={() => setSelectedMethod(method.id)}
                            activeOpacity={0.8}
                        >
                            <View className="w-full h-10 justify-center items-center mb-2.5">
                                <Image source={{ uri: method.icon }} className="w-[60px] h-8" resizeMode="contain" />
                            </View>
                            <Text className={`text-[12px] font-bold ${selectedMethod === method.id ? 'text-secondary' : 'text-slate-500'}`}>{method.name}</Text>
                            {selectedMethod === method.id && (
                                <View className="absolute top-2 right-2 bg-secondary w-5 h-5 rounded-full items-center justify-center">
                                    <Ionicons name="checkmark" size={12} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row items-center justify-center mb-8">
                    <Ionicons name="shield-checkmark" size={20} color="#10b981" />
                    <Text className="ml-2 text-[12px] text-slate-400 font-semibold">Your payment is encrypted and 100% secure.</Text>
                </View>

                <Button
                    label={`Pay $${total.toFixed(2)} with ${selectedPayment?.name}`}
                    onPress={handlePayment}
                    loading={isProcessing}
                    variant="primary"
                    className="h-14 rounded-2xl shadow-lg shadow-indigo-500/20 elevation-4"
                />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
