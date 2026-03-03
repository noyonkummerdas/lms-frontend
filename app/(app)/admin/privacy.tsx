import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function PrivacyPolicyScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, enroll in a course, or communicate with our support team. This includes your name, email address, profile picture, and payment information processed through secure gateways like Stripe, bKash, or Nagad."
        },
        {
            title: "2. How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, including processing transactions, sending course updates, and personalizing your learning experience. We also use data for platform analytics to improve our curriculum and user interface."
        },
        {
            title: "3. Information Sharing",
            content: "We do not share your personal information with third parties except as necessary to provide our services (e.g., payment processors), comply with legal obligations, or protect our rights. Your course progress may be visible to the instructor of the specific course you are enrolled in."
        },
        {
            title: "4. Data Security",
            content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. All passwords are encrypted using industry-standard hashing algorithms (bcrypt), and payment data is handled by PCI-compliant providers."
        },
        {
            title: "5. Your Choices",
            content: "You can update your profile information or change your password at any time through your Profile settings. You can also manage your communication preferences, such as push notifications and system emails, in the Platform Settings menu."
        },
        {
            title: "6. Cookies and Tracking",
            content: "Our platform may use cookies to enhance your experience, remember your preferences, and analyze platform traffic. You can control cookie settings through your browser or device settings."
        },
        {
            title: "7. Updates to This Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the effective date at the top."
        }
    ];

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('privacyPolicy')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.lastUpdated}>Last Updated: March 3, 2026</Text>
                    <Text style={styles.introText}>
                        At TechSoul LMS, we are committed to protecting your privacy and ensuring you have a safe and secure learning experience. This Privacy Policy explains how we collect, use, and safeguard your data.
                    </Text>

                    {sections.map((section, index) => (
                        <Card key={index} style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.sectionContent}>{section.content}</Text>
                        </Card>
                    ))}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            If you have any questions about this Privacy Policy, please contact us at support@techsoul.com
                        </Text>
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray[100],
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gray[50],
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.primary,
    },
    scroll: { flex: 1 },
    content: { padding: 16 },
    lastUpdated: {
        fontSize: 13,
        color: COLORS.gray[400],
        fontWeight: "600",
        marginBottom: 8,
    },
    introText: {
        fontSize: 15,
        color: COLORS.gray[600],
        lineHeight: 22,
        marginBottom: 24,
    },
    sectionCard: {
        padding: 20,
        marginBottom: 16,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.primary,
        marginBottom: 12,
    },
    sectionContent: {
        fontSize: 14,
        color: COLORS.gray[600],
        lineHeight: 22,
    },
    footer: {
        marginTop: 24,
        padding: 20,
        backgroundColor: COLORS.primary + "08",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.primary + "15",
    },
    footerText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 18,
    }
});
