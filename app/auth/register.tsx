import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

      if (result.user.role === "admin") router.replace("/admin" as any);
      else if (result.user.role === "instructor") router.replace("/instructor" as any);
      else router.replace("/student" as any);

      Alert.alert("Success", `Welcome, ${result.user.name}!`);
    } catch (error: any) {
      Alert.alert("Registration Failed", error?.data?.message || error?.message || "Could not create account");
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our learning community today</Text>
          </Animated.View>

          <View style={styles.roleContainer}>
            <Text style={styles.sectionLabel}>I want to join as a:</Text>
            <View style={styles.roleRow}>
              <TouchableOpacity
                style={[styles.roleCard, role === "student" && styles.roleCardActive]}
                onPress={() => setRole("student")}
                activeOpacity={0.7}
              >
                <View style={[styles.roleIconBox, role === "student" && styles.roleIconBoxActive]}>
                  <Ionicons name="school" size={28} color={role === "student" ? COLORS.white : COLORS.gray[400]} />
                </View>
                <Text style={[styles.roleName, role === "student" && styles.roleNameActive]}>Student</Text>
                {role === "student" && <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} style={styles.checkIcon} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleCard, role === "instructor" && styles.roleCardActive]}
                onPress={() => setRole("instructor")}
                activeOpacity={0.7}
              >
                <View style={[styles.roleIconBox, role === "instructor" && styles.roleIconBoxActive]}>
                  <Ionicons name="briefcase" size={28} color={role === "instructor" ? COLORS.white : COLORS.gray[400]} />
                </View>
                <Text style={[styles.roleName, role === "instructor" && styles.roleNameActive]}>Instructor</Text>
                {role === "instructor" && <Ionicons name="checkmark-circle" size={20} color={COLORS.secondary} style={styles.checkIcon} />}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={COLORS.gray[400]} style={styles.inputIcon} />
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors((e) => ({ ...e, name: "" }));
                  }}
                  style={styles.input}
                />
              </View>
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray[400]} style={styles.inputIcon} />
                <Input
                  placeholder="john@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((e) => ({ ...e, email: "" }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray[400]} style={styles.inputIcon} />
                <Input
                  placeholder="Create a password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((e) => ({ ...e, password: "" }));
                  }}
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              <Text style={styles.fieldHint}>Must be at least 6 characters</Text>
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <Button
              label={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleRegister}
              disabled={isLoading}
              variant="primary"
              size="lg"
              style={styles.registerBtn}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialBtn, { borderColor: '#DB4437' }]} activeOpacity={0.8}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { borderColor: '#4267B2' }]} activeOpacity={0.8}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { borderColor: '#000000' }]} activeOpacity={0.8}>
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.push("/auth/login")}
              activeOpacity={0.7}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { marginBottom: 32 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[500],
  },
  roleContainer: { marginBottom: 32 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 16,
    marginLeft: 4,
  },
  roleRow: { flexDirection: "row", justifyContent: "space-between" },
  roleCard: {
    flex: 0.48,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  roleCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  roleIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.gray[100],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  roleIconBoxActive: {
    backgroundColor: COLORS.secondary,
  },
  roleName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gray[500],
  },
  roleNameActive: {
    color: COLORS.secondary,
  },
  checkIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  form: { width: "100%" },
  field: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, borderWidth: 0, paddingLeft: 0 },
  fieldHint: { fontSize: 12, color: COLORS.gray[500], marginTop: 6, marginLeft: 4 },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4, marginLeft: 12 },
  registerBtn: {
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    marginTop: 10,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginLink: { alignItems: "center", marginTop: 24 },
  loginText: { color: COLORS.gray[600], fontSize: 15 },
  loginLinkBold: { color: COLORS.secondary, fontWeight: "700" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { marginHorizontal: 16, color: COLORS.gray[400], fontWeight: "600" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10
  },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});
