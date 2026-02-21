import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Navbar title="Notifications" showMenu={false} />
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🔔</Text>
        <Text style={styles.emptyText}>No new notifications</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: COLORS.gray[600] },
});
