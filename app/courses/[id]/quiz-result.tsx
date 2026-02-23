import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function QuizResultScreen() {
    const router = useRouter();
    const { id, score, total, title } = useLocalSearchParams<{
        id: string;
        score: string;
        total: string;
        title: string;
    }>();

    const numScore = parseInt(score || "0");
    const numTotal = parseInt(total || "1");
    const percentage = (numScore / numTotal) * 100;
    const passed = percentage >= 70;

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <View style={styles.content}>
                <View style={[styles.statusIcon, { backgroundColor: passed ? COLORS.success + "15" : COLORS.danger + "15" }]}>
                    <Ionicons
                        name={passed ? "checkmark-circle" : "alert-circle"}
                        size={80}
                        color={passed ? COLORS.success : COLORS.danger}
                    />
                </View>

                <Text style={styles.resultTitle}>{passed ? "Quiz Passed!" : "Try Again!"}</Text>
                <Text style={styles.resultSub}>
                    {passed
                        ? "Congratulations! You've mastered this module."
                        : "You need at least 70% to pass this quiz."}
                </Text>

                <Card style={styles.scoreCard}>
                    <View style={styles.scoreRow}>
                        <View style={styles.scoreItem}>
                            <Text style={styles.scoreValue}>{numScore}</Text>
                            <Text style={styles.scoreLabel}>Correct</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.scoreItem}>
                            <Text style={styles.scoreValue}>{numTotal}</Text>
                            <Text style={styles.scoreLabel}>Questions</Text>
                        </View>
                    </View>
                    <View style={styles.percentageBar}>
                        <View style={[styles.percentageFill, { width: `${percentage}%`, backgroundColor: passed ? COLORS.success : COLORS.danger }]} />
                    </View>
                    <Text style={styles.percentageText}>{Math.round(percentage)}% Score</Text>
                </Card>

                <View style={styles.actions}>
                    <Button
                        label={passed ? "Continue Learning" : "Retake Quiz"}
                        onPress={() => passed ? router.back() : router.replace(`/courses/${id}/quiz`)}
                        variant="primary"
                        style={styles.mainBtn}
                    />
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.replace(`/courses/${id}/learn`)}>
                        <Text style={styles.backBtnText}>Return to Curriculum</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
    statusIcon: { width: 120, height: 120, borderRadius: 60, alignItems: "center", justifyContent: "center", marginBottom: 24 },
    resultTitle: { fontSize: 28, fontWeight: "900", color: COLORS.primary, marginBottom: 12 },
    resultSub: { fontSize: 16, color: COLORS.gray[500], textAlign: "center", marginBottom: 40, lineHeight: 24 },
    scoreCard: { width: "100%", padding: 24, alignItems: "center" },
    scoreRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
    scoreItem: { flex: 1, alignItems: "center" },
    scoreValue: { fontSize: 24, fontWeight: "800", color: COLORS.primary },
    scoreLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 4, textTransform: "uppercase" },
    divider: { width: 1, height: 40, backgroundColor: COLORS.gray[100] },
    percentageBar: { width: "100%", height: 8, backgroundColor: COLORS.gray[100], borderRadius: 4, marginBottom: 12, overflow: "hidden" },
    percentageFill: { height: "100%", borderRadius: 4 },
    percentageText: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
    actions: { width: "100%", marginTop: 40 },
    mainBtn: { height: 56, borderRadius: 16, marginBottom: 16 },
    backBtn: { padding: 12, alignItems: "center" },
    backBtnText: { color: COLORS.gray[500], fontWeight: "700", fontSize: 15 }
});
