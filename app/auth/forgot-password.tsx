import { View, Text, StyleSheet, ScrollView, Animated, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, Input, Navbar } from "../../components";
import { COLORS } from "../../constants/colors";
import { TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleResetRequest = () => {
        if (!email || !email.includes("@")) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Navbar title="" showBack={true} onBackPress={() => router.back()} />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name={isSent ? "mail-open-outline" : "lock-open-outline"}
                                size={64}
                                color={COLORS.secondary}
                            />
                        </View>
                        <Text style={styles.title}>{isSent ? "Check Your Email" : "Forgot Password?"}</Text>
                        <Text style={styles.subtitle}>
                            {isSent
                                ? `We've sent a password reset link to ${email}`
                                : "Enter your email address and we'll send you a link to reset your password."}
                        </Text>
                    </Animated.View>

                    {!isSent ? (
                        <View style={styles.form}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="mail-outline" size={20} color={COLORS.gray[400]} style={styles.inputIcon} />
                                    <Input
                                        placeholder="name@example.com"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <Button
                                label="Send Reset Link"
                                onPress={handleResetRequest}
                                loading={isLoading}
                                variant="primary"
                                size="lg"
                                style={styles.resetBtn}
                            />
                        </View>
                    ) : (
                        <View style={styles.doneContainer}>
                            <Button
                                label="Back to Login"
                                onPress={() => router.replace("/auth/login")}
                                variant="secondary"
                                size="lg"
                                style={styles.backBtn}
                            />
                            <TouchableOpacity
                                onPress={() => setIsSent(false)}
                                style={styles.resendLink}
                            >
                                <Text style={styles.resendText}>Didn't receive email? <Text style={styles.resendBold}>Try again</Text></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    scroll: { flex: 1 },
    scrollContent: { padding: 24, paddingTop: 20 },
    header: { alignItems: "center", marginBottom: 40 },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: "900",
        color: COLORS.primary,
        marginBottom: 12,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.gray[500],
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 20
    },
    form: { width: "100%" },
    field: { marginBottom: 32 },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.primary,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, height: 50, borderWidth: 0, paddingLeft: 0 },
    resetBtn: {
        borderRadius: 12,
        height: 56,
        backgroundColor: COLORS.secondary,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    doneContainer: { width: "100%", alignItems: "center" },
    backBtn: { width: "100%", height: 56, borderRadius: 12, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
    resendLink: { marginTop: 24 },
    resendText: { color: COLORS.gray[500], fontSize: 14 },
    resendBold: { color: COLORS.secondary, fontWeight: "700" }
});
