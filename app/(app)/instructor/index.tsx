import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../hooks";
import { InstructorNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function InstructorDashboardScreen() {
  const { user } = useAuth();
  const [withdrawalStatus, setWithdrawalStatus] = useState<"idle" | "pending" | "processing">("idle");

  const stats = [
    { label: "Active Students", value: "1,280", icon: "people", color: COLORS.success },
    { label: "Total Earnings", value: "$4,120", icon: "wallet", color: COLORS.secondary },
    { label: "Pending Payout", value: withdrawalStatus === "idle" ? "$850" : "$0", icon: "time", color: "#F39C12" },
  ];

  const handleWithdrawal = () => {
    Alert.alert(
      "Confirm Withdrawal",
      "Do you want to withdraw your current balance of $850.00?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            setWithdrawalStatus("pending");
            Alert.alert("Success", "Withdrawal request submitted! It will take 1-3 business days.");
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <InstructorNavbar title="Instructor Dashboard" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name}!</Text>
          <Text style={styles.subtitle}>Your students are making progress.</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: stat.color + "15" }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Course Discovery Insights</Text>
          <Card style={styles.analyticsCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Student Engagement (Last 7 Days)</Text>
              <Ionicons name="trending-up" size={18} color={COLORS.success} />
            </View>
            <View style={styles.chartBody}>
              {[
                { day: "Mon", val: 45 }, { day: "Tue", val: 70 },
                { day: "Wed", val: 55 }, { day: "Thu", val: 90 },
                { day: "Fri", val: 65 }, { day: "Sat", val: 40 },
                { day: "Sun", val: 80 }
              ].map((d, i) => (
                <View key={i} style={styles.chartBarWrapper}>
                  <View style={[styles.chartBar, { height: d.val * 1.5, backgroundColor: i === 3 ? COLORS.secondary : COLORS.secondary + "40" }]} />
                  <Text style={styles.chartDay}>{d.day}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <View style={styles.financeSection}>
          <Text style={styles.sectionTitle}>Finance & Payouts</Text>
          <Card style={styles.payoutCard}>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutLabel}>Available for Withdrawal</Text>
              <Text style={styles.payoutAmount}>{withdrawalStatus === "idle" ? "$850.00" : "$0.00"}</Text>
            </View>
            <TouchableOpacity
              style={[styles.withdrawBtn, withdrawalStatus !== "idle" && { backgroundColor: COLORS.success + "20" }]}
              onPress={handleWithdrawal}
              disabled={withdrawalStatus !== "idle"}
            >
              <Text style={[styles.withdrawBtnText, withdrawalStatus !== "idle" && { color: COLORS.success }]}>
                {withdrawalStatus === "idle" ? "Request Withdrawal" : "Reviewing..."}
              </Text>
              <Ionicons
                name={withdrawalStatus === "idle" ? "arrow-forward" : "checkmark-circle"}
                size={18}
                color={withdrawalStatus === "idle" ? COLORS.white : COLORS.success}
              />
            </TouchableOpacity>
          </Card>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: "800", color: COLORS.primary },
  subtitle: { fontSize: 16, color: COLORS.gray[500], marginTop: 4 },
  statsGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: "flex-start", padding: 16 },
  iconContainer: { padding: 10, borderRadius: 12, marginBottom: 12 },
  statValue: { fontSize: 22, fontWeight: "700", color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.gray[500], marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primary, marginBottom: 12 },
  analyticsSection: { marginBottom: 24 },
  analyticsCard: { padding: 16 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  chartTitle: { fontSize: 13, fontWeight: "700", color: COLORS.gray[500], textTransform: "uppercase" },
  chartBody: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 160, paddingBottom: 10 },
  chartBarWrapper: { alignItems: "center" },
  chartBar: { width: 30, borderRadius: 6 },
  chartDay: { fontSize: 10, color: COLORS.gray[400], marginTop: 8, fontWeight: "600" },
  financeSection: { marginBottom: 24 },
  payoutCard: { padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.white },
  payoutInfo: { flex: 1 },
  payoutLabel: { fontSize: 13, color: COLORS.gray[500], marginBottom: 4 },
  payoutAmount: { fontSize: 24, fontWeight: "900", color: COLORS.primary },
  withdrawBtn: { backgroundColor: COLORS.secondary, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  withdrawBtnText: { color: COLORS.white, fontWeight: "700", marginRight: 8, fontSize: 14 },
});
