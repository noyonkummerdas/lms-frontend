import { View, Text, ScrollView, Alert, StyleSheet, Animated, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input, Card, Navbar } from "../../components";
import { useLoginMutation } from "../../store/api/authApi";
import { setUser, setToken } from "../../store/slices/authSlice";
import { validateForm } from "../../utils/validateForm";
import { AppDispatch } from "../../store/store";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

      if (result.user.role === "admin") router.replace("/admin" as any);
      else if (result.user.role === "instructor") router.replace("/instructor" as any);
      else router.replace("/student" as any);

      Alert.alert("Success", `Welcome back, ${result.user.name}!`);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Invalid credentials";
      Alert.alert("Login Failed", message);
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={64} color={COLORS.secondary} />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your LMS account</Text>
          </Animated.View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray[400]} style={styles.inputIcon} />
                <Input
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: "" }));
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
                  placeholder="Your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={styles.forgotPass}
              activeOpacity={0.7}
              onPress={() => router.push("/auth/forgot-password")}
            >
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              label={isLoading ? "Logging in..." : "Sign In"}
              onPress={handleLogin}
              disabled={isLoading}
              variant="primary"
              size="lg"
              style={styles.loginBtn}
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
              style={styles.registerLink}
              onPress={() => router.push("/auth/register")}
              activeOpacity={0.7}
            >
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerLinkBold}>Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.demoBox}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.gray[500]} />
            <Text style={styles.demoText}>
              Demo: admin@test.com / any password
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60 },
  header: { alignItems: "center", marginBottom: 40 },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
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
    textAlign: "center",
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
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4, marginLeft: 12 },
  forgotPass: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPassText: { color: COLORS.secondary, fontWeight: "600", fontSize: 14 },
  loginBtn: {
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
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
    marginBottom: 40,
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
  registerLink: { alignItems: "center" },
  registerText: { color: COLORS.gray[600], fontSize: 15 },
  registerLinkBold: { color: COLORS.secondary, fontWeight: "700" },
  demoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: COLORS.gray[100],
    padding: 12,
    borderRadius: 8,
  },
  demoText: {
    fontSize: 12,
    color: COLORS.gray[600],
    marginLeft: 6,
    fontStyle: "italic",
  },
});
