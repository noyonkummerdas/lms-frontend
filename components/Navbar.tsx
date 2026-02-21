import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface NavbarProps {
  title?: string;
  showMenu?: boolean;
  showBack?: boolean;
  onMenuPress?: () => void;
  onBackPress?: () => void;
}

export default function Navbar({
  title = "LMS",
  showMenu = true,
  showBack = false,
  onMenuPress,
  onBackPress,
}: NavbarProps) {
  return (
    <View style={styles.navbar}>
      {showBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      )}
      {showMenu && !showBack && (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn}>
          <Text style={styles.icon}>☰</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: { paddingVertical: 4, paddingHorizontal: 4 },
  icon: { color: COLORS.white, fontSize: 20 },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  placeholder: { width: 24 },
});
