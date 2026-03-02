import { View, Text, TouchableOpacity, ViewStyle } from "react-native";

interface QuizCardProps {
  title: string;
  description?: string;
  questionsCount: number;
  passingScore: number;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
}

export default function QuizCard({
  title,
  description,
  questionsCount,
  passingScore,
  onPress,
  style,
  className,
}: QuizCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      className={`bg-white border border-slate-200 rounded-2xl p-4 mb-3 ${className}`}
      activeOpacity={0.7}
    >
      <Text className="text-[18px] font-extrabold text-primary mb-2">{title}</Text>
      {description && (
        <Text className="text-[14px] text-slate-500 mb-3">{description}</Text>
      )}
      <View className="flex-row justify-between pt-3 border-t border-slate-50">
        <Text className="text-[14px] text-slate-400 font-semibold">
          📝 {questionsCount} questions
        </Text>
        <Text className="text-[14px] text-success font-bold">
          Passing: {passingScore}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}
