import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { useSidebar } from "../contexts/SidebarContext";

interface AdminNavbarProps {
  title: string;
}

export default function AdminNavbar({ title }: AdminNavbarProps) {
  const sidebar = useSidebar();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => sidebar?.toggle?.()} style={styles.iconBtn}>
        <Text style={styles.icon}>☰</Text>
      </TouchableOpacity>
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
  },
  iconBtn: { paddingVertical: 4, paddingHorizontal: 4 },
  icon: { color: COLORS.white, fontSize: 20 },
  title: { color: COLORS.white, fontSize: 18, fontWeight: "700", flex: 1, textAlign: "center" },
  placeholder: { width: 24 },
});
