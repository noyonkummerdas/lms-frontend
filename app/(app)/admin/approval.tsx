import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AdminNavbar } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function ApprovalScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AdminNavbar title="Course Approval" />
      <View style={styles.content}><Text style={styles.placeholder}>Pending approvals (coming soon)</Text></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  placeholder: { color: COLORS.gray[600] },
});
