import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
        <TouchableOpacity onPress={onBackPress} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
      {showMenu && !showBack && (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="menu" size={24} color={COLORS.white} />
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
    height: 60,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  placeholder: { width: 40 },
});
