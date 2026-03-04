import { useState, useCallback } from "react";
import { View, ViewStyle, ActivityIndicator, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { COLORS } from "../constants/colors";

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  style?: ViewStyle;
  className?: string;
}

export default function VideoPlayer({ videoUrl, style, className }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);

  // Function to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <View style={[styles.container, style]} className={className}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator color={COLORS.secondary} size="large" />
        </View>
      )}

      {youtubeId ? (
        <YoutubePlayer
          height={220}
          play={false}
          videoId={youtubeId}
          onReady={onReady}
        />
      ) : (
        <View style={styles.placeholder}>
          {/* Fallback for other video types or placeholder */}
          <View style={styles.playIcon} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: 16 / 9,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 25,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: "white",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginLeft: 5,
    opacity: 0.8,
  }
});
