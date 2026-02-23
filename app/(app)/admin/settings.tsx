import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function AdminSettingsScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title="Platform Settings" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.secondary + "15" }]}>
                <Ionicons name="globe-outline" size={20} color={COLORS.secondary} />
              </View>
              <Text style={styles.settingLabel}>Site Language</Text>
            </View>
            <Text style={styles.settingValue}>English (US)</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.success + "15" }]}>
                <Ionicons name="mail-outline" size={20} color={COLORS.success} />
              </View>
              <Text style={styles.settingLabel}>System Emails</Text>
            </View>
            <Switch value={true} trackColor={{ false: COLORS.gray[200], true: COLORS.secondary }} />
          </View>

          <View style={[styles.settingItem, styles.lastItem]}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.warning + "15" }]}>
                <Ionicons name="notifications-outline" size={20} color={COLORS.warning} />
              </View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch value={false} trackColor={{ false: COLORS.gray[200], true: COLORS.secondary }} />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Payment Configuration</Text>
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.accent + "15" }]}>
                <Ionicons name="card-outline" size={20} color={COLORS.accent} />
              </View>
              <Text style={styles.settingLabel}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray[300]} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.lastItem]} activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.primary + "15" }]}>
                <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.settingLabel}>Currency Settings</Text>
            </View>
            <Text style={styles.settingValue}>USD ($)</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Maintenance</Text>
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.danger + "15" }]}>
                <Ionicons name="refresh-outline" size={20} color={COLORS.danger} />
              </View>
              <Text style={styles.settingLabel}>Clear System Cache</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.lastItem]} activeOpacity={0.7} onPress={() => { }}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.danger + "15" }]}>
                <Ionicons name="warning-outline" size={20} color={COLORS.danger} />
              </View>
              <Text style={[styles.settingLabel, { color: COLORS.danger }]}>Maintenance Mode</Text>
            </View>
            <Switch value={false} trackColor={{ false: COLORS.gray[200], true: COLORS.danger }} />
          </TouchableOpacity>
        </Card>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 14, fontWeight: "800", color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  settingsCard: { padding: 0, overflow: "hidden", marginBottom: 24 },
  settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.gray[50] },
  lastItem: { borderBottomWidth: 0 },
  settingInfo: { flexDirection: "row", alignItems: "center" },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: 12 },
  settingLabel: { fontSize: 15, fontWeight: "600", color: COLORS.primary },
  settingValue: { fontSize: 14, color: COLORS.gray[500], fontWeight: "500" },
});
