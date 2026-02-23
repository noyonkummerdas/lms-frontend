import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks";
import { Navbar, Card } from "../../../components";
import { useSidebar } from "../../../contexts/SidebarContext";
import { COLORS } from "../../../constants/colors";

export default function StudentProfileScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const sidebar = useSidebar();

  const SETTINGS = [
    { label: "Edit Profile", icon: "person-outline", color: COLORS.secondary, route: "/student/edit-profile" },
    { label: "My Certificates", icon: "ribbon-outline", color: COLORS.warning, route: "/student/certificates" },
    { label: "Payment History", icon: "wallet-outline", color: COLORS.success, route: "payment" },
    { label: "Notification Settings", icon: "notifications-outline", color: COLORS.accent, route: "notif" },
    { label: "Help & Support", icon: "help-circle-outline", color: COLORS.gray[500], route: "help" },
  ];

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="Profile" showMenu={true} onMenuPress={sidebar?.toggle} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.avatarContainer}
            activeOpacity={0.8}
            onPress={() => Alert.alert("Upload", "Choose a new profile picture")}
          >
            <View style={styles.avatarFill}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || "S"}</Text>
            </View>
            <View style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={18} color={COLORS.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{user?.name || "Student Name"}</Text>
          <Text style={styles.userRole}>LEARNER</Text>
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statBox} onPress={() => router.push("/student/courses")}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </TouchableOpacity>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Finished</Text>
          </View>
          <TouchableOpacity style={styles.statBox} onPress={() => Alert.alert("Certificates", "You have earned 4 certificates!")}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Card style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.settingItem, index === SETTINGS.length - 1 && styles.lastItem]}
              activeOpacity={0.7}
              onPress={() => item.route.startsWith("/") ? router.push(item.route as any) : Alert.alert(item.label, `Navigate to ${item.label} screen`)}
            >
              <View style={[styles.settingIcon, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.gray[300]} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/auth/login")}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1 },
  profileHeader: { alignItems: "center", paddingVertical: 32, backgroundColor: COLORS.white },
  avatarContainer: { marginBottom: 16 },
  avatarFill: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 40, fontWeight: "800", color: COLORS.white },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: { fontSize: 24, fontWeight: "800", color: COLORS.primary, marginBottom: 4 },
  userRole: { fontSize: 13, fontWeight: "700", color: COLORS.secondary, letterSpacing: 1 },
  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
    marginBottom: 24,
  },
  statBox: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary, marginHorizontal: 16, marginBottom: 12 },
  settingsCard: { marginHorizontal: 16, padding: 0, overflow: "hidden" },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[50]
  },
  lastItem: { borderBottomWidth: 0 },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16
  },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: COLORS.primary },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.danger + "30",
  },
  logoutText: { fontSize: 16, fontWeight: "700", color: COLORS.danger, marginLeft: 8 },
});
