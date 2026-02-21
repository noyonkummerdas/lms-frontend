import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; onPress: () => void }[];
}

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <ScrollView style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 40,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 256,
    backgroundColor: COLORS.primary,
    zIndex: 50,
    paddingTop: 16,
  },
  closeBtn: { paddingHorizontal: 16, paddingVertical: 8 },
  closeText: { color: COLORS.white, fontSize: 20 },
  menu: { flex: 1, marginTop: 16 },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[700],
  },
  menuText: { color: COLORS.white, fontSize: 16 },
});
