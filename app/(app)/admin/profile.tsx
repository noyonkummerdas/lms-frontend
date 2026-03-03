import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function AdminProfileScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  const SETTINGS = [
    { label: t('personalInformation'), icon: "person-outline", color: COLORS.secondary },
    { label: t('notificationSettings'), icon: "notifications-outline", color: COLORS.success },
    { label: t('securityPassword'), icon: "lock-closed-outline", color: COLORS.warning },
    { label: t('privacyPolicy'), icon: "shield-checkmark-outline", color: COLORS.accent },
    { label: t('helpCenter'), icon: "help-circle-outline", color: COLORS.gray[500] },
  ];

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title={t('profile')} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarFill}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || "A"}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.7} onPress={() => { }}>
              <Ionicons name="camera" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || t('admin')}</Text>
          <Text style={styles.userRole}>{t('administrator').toUpperCase()}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1.2k</Text>
            <Text style={styles.statLabel}>{t('totalUsers')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>{t('totalCourses')}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$12k</Text>
            <Text style={styles.statLabel}>{t('revenue')}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('accountSettings')}</Text>
        <Card style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.settingItem, index === SETTINGS.length - 1 && styles.lastItem]}
              activeOpacity={0.7}
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
          <Text style={styles.logoutText}>{t('logout')}</Text>
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
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
