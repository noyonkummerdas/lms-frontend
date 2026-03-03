import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetAllTransactionsQuery } from "../../../store/api/paymentApi";
import { useGetAdminStatsQuery } from "../../../store/api/reportApi";

export default function PaymentsScreen() {
  const { t } = useTranslation();
  const { data: transactions, isLoading: isListLoading, refetch: refetchList } = useGetAllTransactionsQuery();
  const { data: stats, isLoading: isStatsLoading, refetch: refetchStats } = useGetAdminStatsQuery();

  const onRefresh = () => {
    refetchList();
    refetchStats();
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.txCard}>
      <View style={styles.txHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={16} color={COLORS.secondary} />
          </View>
          <View>
            <Text style={styles.userName}>{(item.user as any)?.name || "Unknown User"}</Text>
            <Text style={styles.userEmail}>{(item.user as any)?.email}</Text>
          </View>
        </View>
        <Text style={styles.txAmount}>${item.amount}</Text>
      </View>

      <Text style={styles.courseName}>{(item.course as any)?.title || "N/A"}</Text>

      <View style={styles.txFooter}>
        <Text style={styles.txDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <View style={[styles.statusBadge, {
          backgroundColor: item.paymentStatus === "completed" ? COLORS.success + "15" :
            item.paymentStatus === "pending" ? COLORS.warning + "15" : COLORS.danger + "15"
        }]}>
          <Text style={[styles.statusText, {
            color: item.paymentStatus === "completed" ? COLORS.success :
              item.paymentStatus === "pending" ? COLORS.warning : COLORS.danger
          }]}>{t(item.paymentStatus + 'Status')}</Text>
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
          <Text style={styles.statValue}>
            {isStatsLoading ? "..." : `$${stats?.totalRevenue?.toLocaleString() || "0.00"}`}
          </Text>
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

      {isListLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item: any) => item._id || item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isListLoading || isStatsLoading} onRefresh={onRefresh} colors={[COLORS.secondary]} />
          }
          ListEmptyComponent={() => (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text style={{ color: COLORS.gray[400] }}>No transactions recorded.</Text>
            </View>
          )}
        />
      )}
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
  txCard: { marginBottom: 16, padding: 16, borderRadius: 20 },
  txHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  userIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.secondary + "15", alignItems: "center", justifyContent: "center", marginRight: 12 },
  userName: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
  userEmail: { fontSize: 12, color: COLORS.gray[400] },
  txAmount: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  courseName: { fontSize: 13, color: COLORS.gray[500], marginBottom: 16, fontStyle: 'italic' },
  txFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.gray[100], paddingTop: 12 },
  txDate: { fontSize: 12, color: COLORS.gray[400], fontWeight: "600" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "800", textTransform: 'capitalize' },
});
