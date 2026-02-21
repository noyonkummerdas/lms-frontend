import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LMS Frontend Ready 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" },
  text: { fontSize: 24, fontWeight: "700", color: "#2563eb" },
});