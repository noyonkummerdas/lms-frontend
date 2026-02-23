import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useAuth } from "../hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { label: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }[];
}

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
}: SidebarProps) {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.userProfile} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || "U"}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>{user?.name || "Global User"}</Text>
              <Text style={styles.userRole}>{user?.role || "Student"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={28} color={COLORS.gray[400]} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <View style={styles.menuItemContent}>
                {item.icon && (
                  <Ionicons name={item.icon} size={20} color={COLORS.gray[400]} style={styles.menuIcon} />
                )}
                <Text style={styles.menuText}>{item.label}</Text>
              </View>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 40,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: COLORS.primary,
    zIndex: 50,
    paddingTop: 40,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 10,
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  userRole: {
    color: COLORS.gray[400],
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  closeBtn: { padding: 4 },
  menu: { flex: 1 },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    color: COLORS.gray[200],
    fontSize: 15,
    fontWeight: "500"
  },
});
