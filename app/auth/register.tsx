import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Card, Navbar } from "../../components";
import { useRegisterMutation } from "../../store/api/authApi";
import { setUser, setToken } from "../../store/slices/authSlice";
import { validateForm } from "../../utils/validateForm";
import { AppDispatch } from "../../store/store";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";

type RegisterRole = "student" | "instructor";

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RegisterRole>("student");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = async () => {
    if (!name.trim()) {
      setErrors((e) => ({ ...e, name: "Name is required" }));
      return;
    }
    const validationErrors = validateForm({ email, password });
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => ({ ...acc, [err.field]: err.message }),
        {}
      );
      setErrors({ ...errors, ...errorMap });
      return;
    }
    setErrors({});

    try {
      const result = await register({ name: name.trim(), email, password, role }).unwrap();
      dispatch(setUser(result.user));
      dispatch(setToken(result.token));
      // Redirect directly by role (avoids race with Redux update)
      if (result.user.role === "admin") router.replace("/admin" as any);
      else if (result.user.role === "instructor") router.replace("/instructor" as any);
      else router.replace("/student" as any);
      Alert.alert("Success", `Welcome, ${result.user.name}!`);
    } catch (error: any) {
      Alert.alert("Registration Failed", error?.data?.message || error?.message || "Could not create account");
    }
  };

  return (
    <View style={styles.screen}>
      <Navbar title="LMS - Create Account" showMenu={false} />

      <ScrollView style={styles.scroll}>
        <Card style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up as Teacher or Student</Text>
        </Card>

        <View style={styles.field}>
          <Text style={styles.label}>I want to join as</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[styles.roleBtn, role === "instructor" && styles.roleBtnActive]}
              onPress={() => setRole("instructor")}
            >
              <Text style={[styles.roleIcon, role === "instructor" && styles.roleTextActive]}>👨‍🏫</Text>
              <Text style={[styles.roleText, role === "instructor" && styles.roleTextActive]}>Teacher</Text>
              <Text style={[styles.roleHint, role === "instructor" && styles.roleTextActive]}>Create & teach courses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, role === "student" && styles.roleBtnActive]}
              onPress={() => setRole("student")}
            >
              <Text style={[styles.roleIcon, role === "student" && styles.roleTextActive]}>📚</Text>
              <Text style={[styles.roleText, role === "student" && styles.roleTextActive]}>Student</Text>
              <Text style={[styles.roleHint, role === "student" && styles.roleTextActive]}>Learn & earn certificates</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Input
            placeholder="Your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors((e) => ({ ...e, name: "" }));
            }}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="email@example.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((e) => ({ ...e, email: "" }));
            }}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        </View>

        <View style={styles.fieldLast}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.hint}>At least 6 characters (numbers or text)</Text>
          <Input
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((e) => ({ ...e, password: "" }));
            }}
            secureTextEntry
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>

        <Button
          label={isLoading ? "Creating account..." : "Create Account"}
          onPress={handleRegister}
          disabled={isLoading}
          variant="secondary"
          size="lg"
          style={styles.btn}
        />

        <Button
          label="Already have an account? Login"
          onPress={() => router.push("/auth/login")}
          variant="primary"
          size="lg"
        />
      </ScrollView>
    </View>
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
  field: { marginBottom: 16 },
  fieldLast: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.primary, marginBottom: 8 },
  hint: { fontSize: 12, color: COLORS.gray[500], marginBottom: 8 },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  btn: { marginBottom: 16 },
  roleRow: { flexDirection: "row" },
  roleBtn: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  roleBtnActive: {
    borderColor: COLORS.secondary,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
  roleIcon: { fontSize: 32, marginBottom: 8, color: COLORS.gray[500] },
  roleText: { fontSize: 16, fontWeight: "600", color: COLORS.primary },
  roleHint: { fontSize: 12, color: COLORS.gray[500], marginTop: 4 },
  roleTextActive: { color: COLORS.secondary },
});
