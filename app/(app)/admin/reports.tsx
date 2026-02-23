import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AdminNavbar, Card } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <AdminNavbar title="Reports & Analytics" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.lastUpdate}>Last updated: Just now</Text>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.7} onPress={() => { }}>
            <Ionicons name="download-outline" size={16} color={COLORS.secondary} />
            <Text style={styles.exportText}>Export PDF</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Total Sales</Text>
            <Text style={styles.statValue}>$42,850</Text>
            <View style={styles.miniChart}>
              {[20, 35, 25, 45, 30, 50, 40].map((h, i) => (
                <View key={i} style={[styles.miniBar, { height: h, backgroundColor: COLORS.secondary }]} />
              ))}
            </View>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Active Tests</Text>
            <Text style={styles.statValue}>1,204</Text>
            <View style={styles.miniChart}>
              {[30, 20, 40, 25, 45, 35, 55].map((h, i) => (
                <View key={i} style={[styles.miniBar, { height: h, backgroundColor: COLORS.success }]} />
              ))}
            </View>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Engagement Overview</Text>
        <Card style={styles.engagementCard}>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.secondary }]} />
              <Text style={styles.legendText}>Course Views</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
              <Text style={styles.legendText}>Enrolled</Text>
            </View>
          </View>

          <View style={styles.mainChart}>
            {[80, 120, 95, 150, 110, 180, 140, 200, 160].map((h, i) => (
              <View key={i} style={styles.chartCol}>
                <View style={[styles.mainBar, { height: h, backgroundColor: COLORS.secondary }]} />
                <View style={[styles.mainBar, { height: h * 0.4, backgroundColor: COLORS.success, marginTop: 4 }]} />
              </View>
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(l => (
              <Text key={l} style={styles.label}>{l}</Text>
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Top Performing Courses</Text>
        <Card style={styles.listCard}>
          {[
            { name: 'React Native Basics', sales: 450, growth: '+12%' },
            { name: 'UI/UX Masterclass', sales: 320, growth: '+8%' },
            { name: 'Python for Beginners', sales: 280, growth: '+15%' },
          ].map((item, i) => (
            <View key={i} style={[styles.listItem, i === 2 && styles.lastItem]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.itemSales}>{item.sales} sales</Text>
                <Text style={styles.itemGrowth}>{item.growth}</Text>
              </View>
            </View>
          ))}
        </Card>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  lastUpdate: { fontSize: 12, color: COLORS.gray[400], fontWeight: "600" },
  exportBtn: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  exportText: { fontSize: 12, color: COLORS.secondary, fontWeight: "700", marginLeft: 4 },
  statsGrid: { flexDirection: "row", marginHorizontal: -8, marginBottom: 24 },
  statCard: { flex: 1, marginHorizontal: 8, padding: 16 },
  statLabel: { fontSize: 12, color: COLORS.gray[500], fontWeight: "600", marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: "800", color: COLORS.primary, marginBottom: 12 },
  miniChart: { flexDirection: "row", alignItems: "flex-end", height: 30, justifyContent: "space-between" },
  miniBar: { width: 4, borderRadius: 2, opacity: 0.8 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 12, marginLeft: 4 },
  engagementCard: { padding: 16, marginBottom: 24 },
  legend: { flexDirection: "row", marginBottom: 20 },
  legendItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: COLORS.gray[500], fontWeight: "600" },
  mainChart: { flexDirection: "row", alignItems: "flex-end", height: 120, justifyContent: "space-between" },
  chartCol: { alignItems: "center" },
  mainBar: { width: 8, borderRadius: 4, opacity: 0.8 },
  chartLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  label: { fontSize: 10, color: COLORS.gray[400], fontWeight: "600" },
  listCard: { padding: 0, overflow: "hidden" },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.gray[50], flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  lastItem: { borderBottomWidth: 0 },
  itemName: { fontSize: 14, fontWeight: "700", color: COLORS.primary, flex: 1 },
  itemMeta: { alignItems: "flex-end" },
  itemSales: { fontSize: 13, fontWeight: "700", color: COLORS.primary },
  itemGrowth: { fontSize: 11, color: COLORS.success, fontWeight: "700", marginTop: 2 },
});
