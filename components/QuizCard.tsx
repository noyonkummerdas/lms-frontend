import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface QuizCardProps {
  title: string;
  description?: string;
  questionsCount: number;
  passingScore: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function QuizCard({
  title,
  description,
  questionsCount,
  passingScore,
  onPress,
  style,
}: QuizCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, style]}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📝 {questionsCount} questions
        </Text>
        <Text style={styles.footerSuccess}>
          Passing: {passingScore}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 14, color: COLORS.gray[500] },
  footerSuccess: { fontSize: 14, color: COLORS.success },
});
