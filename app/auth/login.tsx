import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Card, Navbar } from "../../components";
import { useLoginMutation } from "../../store/api/authApi";
import { setUser, setToken } from "../../store/slices/authSlice";
import { validateForm } from "../../utils/validateForm";
import { AppDispatch } from "../../store/store";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    const validationErrors = validateForm({ email, password });

    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => ({ ...acc, [err.field]: err.message }),
        {}
      );
      setErrors(errorMap);
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setUser(result.user));
      dispatch(setToken(result.token));
      // Redirect directly by role (avoids race with Redux update)
      if (result.user.role === "admin") router.replace("/admin" as any);
      else if (result.user.role === "instructor") router.replace("/instructor" as any);
      else router.replace("/student" as any);
      Alert.alert("Success", `Welcome back, ${result.user.name}!`);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Invalid credentials";
      Alert.alert("Login Failed", message);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <Navbar title="Login" showBack={true} onBackPress={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account to continue</Text>
          <Text style={styles.demoHint}>Demo: admin@test.com, teacher@test.com (any password)</Text>
        </Card>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="email@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>

        <View style={styles.fieldLast}>
          <Text style={styles.label}>Password</Text>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            secureTextEntry
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>

        <Button
          label={isLoading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={isLoading}
          variant="secondary"
          size="lg"
          style={styles.btn}
        />

        <Button
          label="Create Account"
          onPress={() => router.push("/auth/register")}
          variant="primary"
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1, padding: 16 },
  card: { marginTop: 32, marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: { textAlign: "center", color: COLORS.gray[600] },
  demoHint: { textAlign: "center", color: COLORS.gray[500], fontSize: 12, marginTop: 8 },
  field: { marginBottom: 16 },
  fieldLast: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  btn: { marginBottom: 16 },
});
