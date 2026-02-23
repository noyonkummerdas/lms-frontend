import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const DATA = [
    { id: "1", title: "React Native Basics", date: "Jan 12, 2024", id_code: "CERT-9921-X", icon: "logo-react", color: "#61DAFB" },
    { id: "2", title: "Mastering TypeScript", date: "Feb 05, 2024", id_code: "CERT-4412-Y", icon: "code-slash", color: "#3178C6" },
    { id: "3", title: "UI/UX Foundations", date: "Feb 20, 2024", id_code: "CERT-1102-Z", icon: "color-palette", color: "#FF6B6B" },
];

export default function CertificatesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="My Certificates" showBack={true} onBackPress={() => router.back()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Achievements</Text>
                    <Text style={styles.subtitle}>You have earned {DATA.length} professional certificates.</Text>
                </View>

                {DATA.map((item) => (
                    <Card key={item.id} style={styles.certCard}>
                        <View style={[styles.iconBox, { backgroundColor: item.color + "15" }]}>
                            <Ionicons name={item.icon as any} size={32} color={item.color} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.certTitle}>{item.title}</Text>
                            <Text style={styles.certDate}>Issued on {item.date}</Text>
                            <Text style={styles.certCode}>ID: {item.id_code}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.downloadBtn}
                            onPress={() => Alert.alert("Download", "Preparing your high-resolution PDF certificate...")}
                        >
                            <Ionicons name="download-outline" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    </Card>
                ))}

                <View style={styles.shareSection}>
                    <Text style={styles.shareTitle}>Share Your Success</Text>
                    <Text style={styles.shareDesc}>Show the world your new skills on LinkedIn or Twitter!</Text>
                    <TouchableOpacity style={styles.shareBtn}>
                        <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
                        <Text style={styles.shareBtnText}>Share All Certificates</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    scroll: { flex: 1, padding: 20 },
    header: { marginBottom: 24 },
    title: { fontSize: 24, fontWeight: "800", color: COLORS.primary },
    subtitle: { fontSize: 14, color: COLORS.gray[500], marginTop: 4 },
    certCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginBottom: 16,
        backgroundColor: COLORS.white
    },
    iconBox: { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 16 },
    info: { flex: 1 },
    certTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary, marginBottom: 4 },
    certDate: { fontSize: 12, color: COLORS.gray[400], marginBottom: 2 },
    certCode: { fontSize: 11, fontWeight: "700", color: COLORS.secondary, textTransform: "uppercase" },
    downloadBtn: { padding: 8, borderRadius: 12, backgroundColor: COLORS.secondary + "10" },
    shareSection: { marginTop: 32, alignItems: "center", padding: 24, backgroundColor: COLORS.white, borderRadius: 24 },
    shareTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginBottom: 8 },
    shareDesc: { fontSize: 14, color: COLORS.gray[500], textAlign: "center", marginBottom: 20 },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 16
    },
    shareBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 15, marginLeft: 8 }
});
