import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

const { width } = Dimensions.get("window");

export default function ReportsScreen() {
  const { t } = useTranslation();
  const [activeRange, setActiveRange] = useState("Month");
  const timeRanges = ["Day", "Week", "Month", "Year"];

  const kpis = [
    { label: t('revenueLabel'), value: "$42,850", trend: "+12.5%", icon: "cash-outline", color: COLORS.success },
    { label: t('enrolled'), value: "3,120", trend: "+8.2%", icon: "people-outline", color: COLORS.secondary },
    { label: t('avgDaily'), value: "142", trend: "-2.1%", icon: "stats-chart-outline", color: COLORS.warning },
  ];

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title={t('analyticsHub')} />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>{t('systemPerformance')}</Text>
            <Text style={styles.subtext}>{t('insightfulData')}</Text>
          </View>
          <TouchableOpacity style={styles.downloadBtn}>
            <Ionicons name="cloud-download-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Time Range Selector */}
        <View style={styles.filterBar}>
          {timeRanges.map(range => (
            <TouchableOpacity
              key={range}
              style={[styles.filterTab, activeRange === range && styles.filterTabActive]}
              onPress={() => setActiveRange(range)}
            >
              <Text style={[styles.filterTabText, activeRange === range && styles.filterTabTextActive]}>{t(range.toLowerCase())}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KPI Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll} contentContainerStyle={styles.kpiContainer}>
          {kpis.map((kpi, i) => (
            <Card key={i} style={styles.kpiCard}>
              <View style={[styles.kpiIconBox, { backgroundColor: kpi.color + "15" }]}>
                <Ionicons name={kpi.icon as any} size={22} color={kpi.color} />
              </View>
              <Text style={styles.kpiLabel}>{kpi.label}</Text>
              <Text style={styles.kpiValue}>{kpi.value}</Text>
              <View style={styles.trendBox}>
                <Ionicons
                  name={kpi.trend.startsWith("+") ? "trending-up" : "trending-down"}
                  size={14}
                  color={kpi.trend.startsWith("+") ? COLORS.success : COLORS.danger}
                />
                <Text style={[styles.trendText, { color: kpi.trend.startsWith("+") ? COLORS.success : COLORS.danger }]}>
                  {kpi.trend}
                </Text>
              </View>
            </Card>
          ))}
        </ScrollView>

        {/* Main Enrollment Chart */}
        <Text style={styles.sectionTitle}>{t('userEngagement')}</Text>
        <Card style={styles.mainChartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>{t('newEnrollments')}</Text>
              <Text style={styles.chartSub}>Jan - Dec 2024</Text>
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendDot} />
              <Text style={styles.legendLabel}>{t('target')}</Text>
            </View>
          </View>

          <View style={styles.barChartContainer}>
            {[40, 70, 50, 90, 110, 85, 130, 150, 120, 160, 140, 110].map((h, i) => (
              <View key={i} style={styles.barGroup}>
                <View style={[styles.bar, {
                  height: h,
                  backgroundColor: i === 7 ? COLORS.secondary : COLORS.secondary + "30",
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6
                }]} />
                <View style={[styles.barOverlay, { height: h * 0.4 }]} />
              </View>
            ))}
          </View>
          <View style={styles.monthLabels}>
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
              <Text key={i} style={styles.monthLabel}>{m}</Text>
            ))}
          </View>
        </Card>

        {/* Category Performance */}
        <View style={styles.categoryRow}>
          <Card style={styles.categoryCard}>
            <Text style={styles.cardTitleSmall}>{t('courseDistribution')}</Text>
            <View style={styles.donutContainer}>
              <View style={styles.donutOuter}>
                <View style={styles.donutInner}>
                  <Text style={styles.donutCenterValue}>82%</Text>
                  <Text style={styles.donutCenterLabel}>Health</Text>
                </View>
              </View>
            </View>
            <View style={styles.distributionLabels}>
              <View style={styles.distLabel}><View style={[styles.distDot, { backgroundColor: COLORS.secondary }]} /><Text style={styles.distText}>Dev</Text></View>
              <View style={styles.distLabel}><View style={[styles.distDot, { backgroundColor: COLORS.success }]} /><Text style={styles.distText}>Design</Text></View>
            </View>
          </Card>

          <Card style={styles.categoryCard}>
            <Text style={styles.cardTitleSmall}>{t('conversionRate')}</Text>
            <View style={styles.conversionBox}>
              <Text style={styles.hugePercentage}>6.8%</Text>
              <View style={styles.conversionVisual}>
                <View style={styles.conversionTrack}>
                  <View style={[styles.conversionFill, { width: '68%' }]} />
                </View>
              </View>
              <Text style={styles.conversionMeta}>+1.2% {t('thisMonth')}</Text>
            </View>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>{t('topInstructors')}</Text>
        <Card style={styles.instructorCard}>
          {[
            { name: "Prof. Sarah Wilson", sales: "$12,400", students: 1200, avatar: "SW" },
            { name: "John Archer", sales: "$9,850", students: 850, avatar: "JA" },
            { name: "Emily Blunt", sales: "$7,200", students: 600, avatar: "EB" }
          ].map((item, i) => (
            <View key={i} style={[styles.instructorRow, i === 2 && styles.noBorder]}>
              <View style={styles.instructorAvatar}><Text style={styles.avatarText}>{item.avatar}</Text></View>
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{item.name}</Text>
                <Text style={styles.instructorMeta}>{item.students} students supervised</Text>
              </View>
              <Text style={styles.earningsText}>{item.sales}</Text>
            </View>
          ))}
        </Card>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 16
  },
  welcomeText: { fontSize: 24, fontWeight: "900", color: COLORS.primary },
  subtext: { fontSize: 13, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
  downloadBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },

  filterBar: { flexDirection: "row", paddingHorizontal: 24, marginBottom: 24 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, marginRight: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray[100] },
  filterTabActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  filterTabText: { fontSize: 12, fontWeight: "700", color: COLORS.gray[500] },
  filterTabTextActive: { color: COLORS.white },

  kpiScroll: { marginBottom: 24 },
  kpiContainer: { paddingLeft: 24, paddingRight: 8 },
  kpiCard: { width: width * 0.4, marginRight: 16, padding: 16, borderRadius: 24 },
  kpiIconBox: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  kpiLabel: { fontSize: 12, color: COLORS.gray[400], fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  kpiValue: { fontSize: 18, fontWeight: "900", color: COLORS.primary, marginVertical: 4 },
  trendBox: { flexDirection: "row", alignItems: "center" },
  trendText: { fontSize: 11, fontWeight: "800", marginLeft: 4 },

  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.primary, marginHorizontal: 24, marginBottom: 16 },

  mainChartCard: { marginHorizontal: 24, padding: 20, marginBottom: 24, borderRadius: 24 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30 },
  chartTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
  chartSub: { fontSize: 12, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
  chartLegend: { flexDirection: "row", alignItems: "center" },
  legendDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.secondary, marginRight: 6 },
  legendLabel: { fontSize: 11, fontWeight: "700", color: COLORS.gray[500] },
  barChartContainer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 160 },
  barGroup: { width: "6%", alignItems: "center" },
  bar: { width: "100%", elevation: 2 },
  barOverlay: { position: "absolute", bottom: 0, width: "100%", backgroundColor: "rgba(255,255,255,0.15)" },
  monthLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 16, paddingHorizontal: 2 },
  monthLabel: { fontSize: 10, fontWeight: "800", color: COLORS.gray[300] },

  categoryRow: { flexDirection: "row", marginHorizontal: 16, marginBottom: 24 },
  categoryCard: { flex: 1, marginHorizontal: 8, padding: 16, borderRadius: 24, alignItems: "center" },
  cardTitleSmall: { fontSize: 13, fontWeight: "800", color: COLORS.primary, marginBottom: 16 },
  donutContainer: { width: 80, height: 80, marginBottom: 16 },
  donutOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 8, borderColor: COLORS.secondary, alignItems: "center", justifyContent: "center" },
  donutInner: { alignItems: "center" },
  donutCenterValue: { fontSize: 16, fontWeight: "900", color: COLORS.primary },
  donutCenterLabel: { fontSize: 9, color: COLORS.gray[400], fontWeight: "700" },
  distributionLabels: { width: "100%" },
  distLabel: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  distDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  distText: { fontSize: 10, fontWeight: "700", color: COLORS.gray[500] },

  conversionBox: { alignItems: "center", width: "100%" },
  hugePercentage: { fontSize: 24, fontWeight: "900", color: COLORS.primary, marginBottom: 12 },
  conversionVisual: { width: "100%", height: 6, backgroundColor: COLORS.gray[50], borderRadius: 3, overflow: "hidden" },
  conversionTrack: { flex: 1 },
  conversionFill: { height: "100%", backgroundColor: COLORS.success, borderRadius: 3 },
  conversionMeta: { fontSize: 10, color: COLORS.success, fontWeight: "800", marginTop: 8 },

  instructorCard: { marginHorizontal: 24, padding: 0, borderRadius: 24, overflow: "hidden" },
  instructorRow: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.gray[50] },
  noBorder: { borderBottomWidth: 0 },
  instructorAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.secondary + "15", alignItems: "center", justifyContent: "center", marginRight: 12 },
  avatarText: { color: COLORS.secondary, fontWeight: "800", fontSize: 14 },
  instructorInfo: { flex: 1 },
  instructorName: { fontSize: 14, fontWeight: "800", color: COLORS.primary },
  instructorMeta: { fontSize: 11, color: COLORS.gray[400], marginTop: 2, fontWeight: "600" },
  earningsText: { fontSize: 14, fontWeight: "900", color: COLORS.primary }
});
