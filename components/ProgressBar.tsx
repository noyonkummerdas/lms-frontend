import { View, Text } from "react-native";

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  progress,
  showLabel = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <View className={className}>
      {showLabel && (
        <Text className="text-[14px] text-slate-600 mb-1 font-semibold">{percentage}%</Text>
      )}
      <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <View
          className="h-full bg-secondary rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}
