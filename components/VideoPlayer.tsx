import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  style?: ViewStyle;
}

export default function VideoPlayer({ title, videoUrl, style }: VideoPlayerProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.placeholder}>
        <View style={styles.playBtn}>
          <View style={styles.playIcon} />
        </View>
      </View>
      {title && <View style={styles.titleBar} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    overflow: "hidden",
  },
  placeholder: {
    width: "100%",
    height: 256,
    backgroundColor: COLORS.gray[800],
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    backgroundColor: COLORS.secondary,
    borderRadius: 9999,
    padding: 16,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: COLORS.white,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginLeft: 4,
  },
  titleBar: {
    padding: 12,
    backgroundColor: COLORS.light,
  },
});
