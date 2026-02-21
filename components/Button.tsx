import { Text, Pressable, ViewStyle, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
}: ButtonProps) {
  const variantBg = {
    primary: COLORS.secondary,
    secondary: COLORS.gray[300],
    danger: COLORS.danger,
    success: COLORS.success,
  };

  const sizeStyles = {
    sm: { paddingHorizontal: 12, paddingVertical: 8 },
    md: { paddingHorizontal: 16, paddingVertical: 12 },
    lg: { paddingHorizontal: 24, paddingVertical: 16 },
  };

  return (
    <Pressable
      style={[
        styles.base,
        { backgroundColor: variantBg[variant] },
        sizeStyles[size],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: { opacity: 0.5 },
  label: { color: COLORS.white, fontWeight: "600", textAlign: "center" },
});
