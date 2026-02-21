import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InstructorNavbar } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function EarningsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <InstructorNavbar title="Earnings" />
      <View style={styles.content}>
        <Text style={styles.placeholder}>Revenue report (coming soon)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  placeholder: { color: COLORS.gray[600] },
});
