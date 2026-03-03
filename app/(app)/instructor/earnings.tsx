import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { InstructorNavbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";

const HISTORY = [
  { id: "1", date: "Mar 20, 2024", type: "Sale", amount: "+$49.99", status: "Completed" },
  { id: "2", date: "Mar 18, 2024", type: "Sale", amount: "+$59.99", status: "Completed" },
  { id: "3", date: "Mar 15, 2024", type: "Withdrawal", amount: "-$200.00", status: "Processing" },
];

export default function EarningsScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <InstructorNavbar title={t('earnings')} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t('currentBalance')}</Text>
          <Text style={styles.balanceValue}>$1,240.50</Text>
          <Button
            label={t('withdrawFunds')}
            onPress={() => { }}
            style={styles.withdrawBtn}
          />
        </Card>

        <Text style={styles.sectionTitle}>{t('monthlyOverview')}</Text>
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTotal}>$3,450.00 {t('totalEarned')}</Text>
            <Text style={styles.chartPeriod}>{t('last6Months')}</Text>
          </View>
          <View style={styles.barContainer}>
            {[40, 60, 45, 80, 55, 70].map((h, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={[styles.bar, { height: h }]} />
                <Text style={styles.barLabel}>{['O', 'N', 'D', 'J', 'F', 'M'][i]}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>{t('transactionHistory')}</Text>
        {HISTORY.map((item) => (
          <Card key={item.id} style={styles.historyCard}>
            <View style={styles.historyIcon}>
              <Ionicons
                name={item.type === "Sale" ? "arrow-down" : "arrow-up"}
                size={20}
                color={item.type === "Sale" ? COLORS.success : COLORS.danger}
              />
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyType}>{t(item.type.toLowerCase())}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <View style={styles.historyAction}>
              <Text style={[styles.historyAmount, { color: item.type === "Sale" ? COLORS.success : COLORS.primary }]}>
                {item.amount}
              </Text>
              <Text style={styles.historyStatus}>{t(item.status.toLowerCase() + 'Status')}</Text>
            </View>
          </Card>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  balanceCard: {
    backgroundColor: COLORS.secondary,
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 24
  },
  balanceLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: "600", marginBottom: 4 },
  balanceValue: { color: COLORS.white, fontSize: 32, fontWeight: "800", marginBottom: 20 },
  withdrawBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    width: "100%"
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 12, marginLeft: 4 },
  chartCard: { padding: 16, marginBottom: 24 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  chartTotal: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
  chartPeriod: { fontSize: 12, color: COLORS.gray[400] },
  barContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 100, paddingHorizontal: 10 },
  barColumn: { alignItems: "center" },
  bar: { width: 12, backgroundColor: COLORS.secondary, borderRadius: 6, opacity: 0.8 },
  barLabel: { fontSize: 10, color: COLORS.gray[400], marginTop: 8, fontWeight: "600" },
  historyCard: { flexDirection: "row", alignItems: "center", padding: 12, marginBottom: 12 },
  historyIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gray[50], alignItems: "center", justifyContent: "center", marginRight: 12 },
  historyDetails: { flex: 1 },
  historyType: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
  historyDate: { fontSize: 12, color: COLORS.gray[400], marginTop: 2 },
  historyAction: { alignItems: "flex-end" },
  historyAmount: { fontSize: 15, fontWeight: "800" },
  historyStatus: { fontSize: 10, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
});
