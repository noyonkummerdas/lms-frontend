import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function AssignmentScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [submission, setSubmission] = useState("");
    const [fileAttached, setFileAttached] = useState(false);

    const handleSubmit = () => {
        if (!submission && !fileAttached) {
            Alert.alert("Error", "Please provide a submission text or attach a file.");
            return;
        }

        Alert.alert(
            "Submission Successful",
            "Your assignment has been submitted for grading.",
            [{ text: "OK", onPress: () => router.back() }]
        );
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="Task Submission" showBack={true} onBackPress={() => router.back()} />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Card style={styles.instructionCard}>
                    <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>ASSIGNMENT</Text>
                    </View>
                    <Text style={styles.assignmentTitle}>Project: Building a Weather App</Text>
                    <Text style={styles.assignmentDesc}>
                        Create a simple React Native app that fetches weather data from an API and displays it beautifully.
                    </Text>
                    <View style={styles.deadlineRow}>
                        <Ionicons name="time-outline" size={16} color={COLORS.danger} />
                        <Text style={styles.deadlineText}>Deadline: Oct 30, 2024</Text>
                    </View>
                </Card>

                <Text style={styles.sectionLabel}>Your Submission</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Paste your code link or write your submission here..."
                    multiline
                    numberOfLines={10}
                    value={submission}
                    onChangeText={setSubmission}
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    style={[styles.uploadBtn, fileAttached && styles.uploadBtnActive]}
                    onPress={() => setFileAttached(!fileAttached)}
                >
                    <Ionicons name={fileAttached ? "checkmark-circle" : "cloud-upload-outline"} size={24} color={fileAttached ? COLORS.success : COLORS.secondary} />
                    <Text style={[styles.uploadText, fileAttached && { color: COLORS.success }]}>
                        {fileAttached ? "project-files.zip attached" : "Attach Project Files (ZIP)"}
                    </Text>
                    {fileAttached && (
                        <TouchableOpacity onPress={() => setFileAttached(false)}>
                            <Ionicons name="close" size={20} color={COLORS.gray[400]} />
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>

                <View style={styles.statusBox}>
                    <Ionicons name="information-circle-outline" size={20} color={COLORS.gray[400]} />
                    <Text style={styles.statusInfo}>Your submission will be reviewed by the instructor within 48 hours.</Text>
                </View>

                <Button
                    label="Submit Assignment"
                    onPress={handleSubmit}
                    variant="primary"
                    style={styles.submitBtn}
                />
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    content: { flex: 1, padding: 20 },
    instructionCard: { padding: 20, marginBottom: 24, backgroundColor: COLORS.white },
    typeBadge: { alignSelf: "flex-start", backgroundColor: COLORS.secondary + "15", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 12 },
    typeText: { fontSize: 10, fontWeight: "800", color: COLORS.secondary },
    assignmentTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginBottom: 8 },
    assignmentDesc: { fontSize: 14, color: COLORS.gray[500], lineHeight: 22, marginBottom: 16 },
    deadlineRow: { flexDirection: "row", alignItems: "center" },
    deadlineText: { fontSize: 13, fontWeight: "600", color: COLORS.danger, marginLeft: 6 },
    sectionLabel: { fontSize: 14, fontWeight: "700", color: COLORS.primary, marginBottom: 12, marginLeft: 4 },
    textArea: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        height: 200,
        fontSize: 15,
        color: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
        marginBottom: 16
    },
    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
        borderStyle: "dashed",
        marginBottom: 32
    },
    uploadBtnActive: { borderColor: COLORS.success, borderStyle: "solid" },
    uploadText: { flex: 1, marginLeft: 12, fontSize: 14, color: COLORS.secondary, fontWeight: "600" },
    statusBox: { flexDirection: "row", backgroundColor: COLORS.gray[50], padding: 16, borderRadius: 12, marginBottom: 24 },
    statusInfo: { flex: 1, marginLeft: 10, fontSize: 12, color: COLORS.gray[500], lineHeight: 18 },
    submitBtn: { height: 56, borderRadius: 16 }
});
