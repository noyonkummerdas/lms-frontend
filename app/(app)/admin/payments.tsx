import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const TRANSACTIONS = [
  { id: "1", user: "John Doe", course: "React Native Basics", amount: "$49.99", date: "Mar 22, 2024", status: "Completed" },
  { id: "2", user: "Jane Smith", course: "Advanced Python", amount: "$59.99", date: "Mar 21, 2024", status: "Completed" },
  { id: "3", user: "Mike Ross", course: "Web Design", amount: "$39.99", date: "Mar 20, 2024", status: "Pending" },
  { id: "4", user: "Harvey Specter", course: "Business Law", amount: "$99.99", date: "Mar 19, 2024", status: "Refunded" },
];

export default function PaymentsScreen() {
  const { t } = useTranslation();
  const renderItem = ({ item }: { item: typeof TRANSACTIONS[0] }) => (
    <Card style={styles.txCard}>
      <View style={styles.txHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={16} color={COLORS.secondary} />
          </View>
          <Text style={styles.userName}>{item.user}</Text>
        </View>
        <Text style={styles.txAmount}>{item.amount}</Text>
      </View>

      <Text style={styles.courseName}>{item.course}</Text>

      <View style={styles.txFooter}>
        <Text style={styles.txDate}>{item.date}</Text>
        <View style={[styles.statusBadge, {
          backgroundColor: item.status === "Completed" ? COLORS.success + "15" :
            item.status === "Pending" ? COLORS.warning + "15" : COLORS.danger + "15"
        }]}>
          <Text style={[styles.statusText, {
            color: item.status === "Completed" ? COLORS.success :
              item.status === "Pending" ? COLORS.warning : COLORS.danger
          }]}>{t(item.status.toLowerCase() + 'Status')}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title={t('paymentManagement')} />
      <View style={styles.statsContainer}>
        <Card style={styles.mainStatCard}>
          <Text style={styles.statLabel}>{t('totalRevenue')}</Text>
          <Text style={styles.statValue}>$12,450.00</Text>
          <View style={styles.trendRow}>
            <Ionicons name="trending-up" size={16} color={COLORS.success} />
            <Text style={styles.trendText}>+12.5% from last month</Text>
          </View>
        </Card>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>{t('recentTransactions')}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
          <Text style={styles.seeAll}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={TRANSACTIONS}
        renderItem={renderItem}
        keyExtractor={(item: any) => item._id || item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  statsContainer: { padding: 16 },
  mainStatCard: {
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 24,
    alignItems: "center"
  },
  statLabel: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  statValue: { color: COLORS.white, fontSize: 32, fontWeight: "800", marginBottom: 12 },
  trendRow: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  trendText: { color: COLORS.success, fontSize: 12, fontWeight: "700", marginLeft: 6 },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, marginBottom: 16 },
  listTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
  seeAll: { fontSize: 14, color: COLORS.secondary, fontWeight: "700" },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  txCard: { marginBottom: 16, padding: 16 },
  txHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  userIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.secondary + "15", alignItems: "center", justifyContent: "center", marginRight: 8 },
  userName: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
  txAmount: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  courseName: { fontSize: 13, color: COLORS.gray[500], marginBottom: 16 },
  txFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[100], paddingTop: 12 },
  txDate: { fontSize: 12, color: COLORS.gray[400], fontWeight: "600" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "800" },
});
