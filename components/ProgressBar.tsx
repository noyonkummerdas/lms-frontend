import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  style?: ViewStyle;
}

export default function ProgressBar({
  progress,
  showLabel = true,
  style,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.wrapper, style]}>
      {showLabel && (
        <Text style={styles.label}>{percentage}%</Text>
      )}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  label: { fontSize: 14, color: COLORS.gray[600], marginBottom: 4 },
  track: {
    width: "100%",
    height: 8,
    backgroundColor: COLORS.light,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
});
