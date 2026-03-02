import { View, ViewStyle } from "react-native";

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  style?: ViewStyle;
  className?: string;
}

export default function VideoPlayer({ title, videoUrl, style, className }: VideoPlayerProps) {
  return (
    <View style={style} className={`bg-black rounded-xl overflow-hidden ${className}`}>
      <View className="w-full h-56 bg-slate-900 justify-center items-center">
        <View className="bg-secondary rounded-full p-4">
          <View
            className="w-0 h-0 border-l-[20px] border-t-[12px] border-b-[12px] border-l-white border-t-transparent border-b-transparent ml-1"
          />
        </View>
      </View>
      {title && <View className="p-3 bg-slate-50" />}
    </View>
  );
}
