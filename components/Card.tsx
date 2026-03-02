import { View, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  onPress?: () => void;
}

export default function Card({ children, style, className, onPress }: CardProps) {
  const Wrapper = (onPress ? TouchableOpacity : View) as any;

  return (
    <Wrapper
      className={cn("bg-white border border-border rounded-lg p-4", className)}
      style={style}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Wrapper>
  );
}
