import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

const MOCK_QUESTIONS = [
    {
        id: 1,
        question: "What is the primary benefit of using React Native?",
        options: [
            "It only works on iOS",
            "Write once, run on multiple platforms",
            "It is slower than web apps",
            "It requires learning Swift and Java"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which component is used to display text in React Native?",
        options: ["<Paragraph>", "<h1>", "<Text>", "<span>"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript X-Platform"],
        correctAnswer: 0
    }
];

export default function QuizScreen() {
    const router = useRouter();
    const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

    useEffect(() => {
        if (timeLeft <= 0) {
            handleFinish();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleNext = () => {
        if (selectedOption === null) {
            Alert.alert("Required", "Please select an option to continue.");
            return;
        }

        const newAnswers = [...answers, selectedOption];
        setAnswers(newAnswers);
        setSelectedOption(null);

        if (currentQuestion < MOCK_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleFinish(newAnswers);
        }
    };

    const handleFinish = (finalAnswers = answers) => {
        let score = 0;
        MOCK_QUESTIONS.forEach((q, index) => {
            if (finalAnswers[index] === q.correctAnswer) {
                score++;
            }
        });

        router.replace({
            pathname: `/courses/${id}/quiz-result`,
            params: {
                score,
                total: MOCK_QUESTIONS.length,
                title: title
            }
        });
    };

    const q = MOCK_QUESTIONS[currentQuestion];
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="Course Quiz" showBack={true} onBackPress={() => router.back()} />

            <View style={styles.header}>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%` }]} />
                    </View>
                </View>
                <View style={styles.timerBadge}>
                    <Ionicons name="time-outline" size={16} color={COLORS.danger} />
                    <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.questionText}>{q.question}</Text>

                {q.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionCard,
                            selectedOption === index && styles.selectedOption
                        ]}
                        onPress={() => setSelectedOption(index)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.radio, selectedOption === index && styles.radioActive]}>
                            {selectedOption === index && <View style={styles.radioInner} />}
                        </View>
                        <Text style={[styles.optionText, selectedOption === index && styles.selectedOptionText]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    label={currentQuestion === MOCK_QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
                    onPress={handleNext}
                    variant="primary"
                    style={styles.nextBtn}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.light },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray[100]
    },
    progressContainer: { flex: 1, marginRight: 20 },
    progressText: { fontSize: 12, fontWeight: "700", color: COLORS.gray[500], marginBottom: 8 },
    progressBar: { height: 6, backgroundColor: COLORS.gray[100], borderRadius: 3, overflow: "hidden" },
    progressFill: { height: "100%", backgroundColor: COLORS.secondary, borderRadius: 3 },
    timerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.danger + "10",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8
    },
    timerText: { marginLeft: 4, color: COLORS.danger, fontWeight: "800", fontSize: 13 },
    content: { flex: 1, padding: 20 },
    questionText: { fontSize: 20, fontWeight: "800", color: COLORS.primary, marginBottom: 32, lineHeight: 28 },
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "transparent"
    },
    selectedOption: { borderColor: COLORS.secondary, backgroundColor: COLORS.secondary + "05" },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.gray[300],
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16
    },
    radioActive: { borderColor: COLORS.secondary },
    radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.secondary },
    optionText: { fontSize: 16, fontWeight: "600", color: COLORS.gray[700], flex: 1 },
    selectedOptionText: { color: COLORS.primary },
    footer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray[100] },
    nextBtn: { height: 56, borderRadius: 16 }
});
