import { Text, Pressable, ViewStyle, ActivityIndicator } from "react-native";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  style,
  className,
  children,
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-secondary",
    secondary: "bg-slate-200",
    danger: "bg-danger",
    success: "bg-success",
  };

  const sizeClasses = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  return (
    <Pressable
      className={cn(
        "rounded-lg justify-center items-center",
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "opacity-50",
        className
      )}
      style={style}
      disabled={disabled || loading}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : children ? (
        children
      ) : (
        <Text className="text-white font-semibold text-center">{label}</Text>
      )}
    </Pressable>
  );
}
