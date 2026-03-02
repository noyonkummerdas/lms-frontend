import { View, Text, ScrollView, Alert, Animated, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input } from "../../components";
import { useLoginMutation, authApi } from "../../store/api/authApi";
import { setUser, setToken } from "../../store/slices/authSlice";
import { validateForm } from "../../utils/validateForm";
import { AppDispatch } from "../../store/store";
import { useRouter } from "expo-router";

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

      console.log(`[LOGIN_DEBUG] Role assigned: ${result.user.role}`);

      // Clear any old data
      dispatch(authApi.util.resetApiState());

      dispatch(setUser(result.user));
      dispatch(setToken(result.token));

      // DIRECT REDIRECTION based on role to avoid any middleman routing issues
      if (result.user.role === "admin") {
        router.replace("/admin" as any);
      } else if (result.user.role === "instructor") {
        router.replace("/instructor" as any);
      } else {
        router.replace("/student" as any);
      }

      Alert.alert("Success", `Welcome, ${result.user.name}!`);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Invalid credentials";
      Alert.alert("Login Failed", message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 24, paddingTop: 60 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View className="items-center mb-10" style={{ opacity: fadeAnim }}>
            <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-5 shadow-lg shadow-black/10 elevation-4">
              <Ionicons name="school" size={64} color="#6366f1" />
            </View>
            <Text className="text-[28px] font-extrabold text-primary mb-2">Welcome Back</Text>
            <Text className="text-[16px] text-slate-500 text-center">Sign in to your LMS account</Text>
          </Animated.View>

          <View className="w-full">
            <View className="mb-5">
              <Text className="text-[14px] font-bold text-primary mb-2 ml-1">Email Address</Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3">
                <Ionicons name="mail-outline" size={20} color="#94a3b8" className="mr-2" />
                <Input
                  className="flex-1"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text className="text-rose-500 text-[12px] mt-1 ml-3">{errors.email}</Text>}
            </View>

            <View className="mb-5">
              <Text className="text-[14px] font-bold text-primary mb-2 ml-1">Password</Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3">
                <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" className="mr-2" />
                <Input
                  className="flex-1"
                  placeholder="Your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  secureTextEntry
                />
              </View>
              {errors.password && <Text className="text-rose-500 text-[12px] mt-1 ml-3">{errors.password}</Text>}
            </View>

            <TouchableOpacity
              className="self-end mb-6"
              activeOpacity={0.7}
              onPress={() => router.push("/auth/forgot-password")}
            >
              <Text className="text-secondary font-semibold text-[14px]">Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              label={isLoading ? "Logging in..." : "Sign In"}
              onPress={handleLogin}
              disabled={isLoading}
              variant="primary"
              className="h-14 rounded-2xl bg-secondary shadow-lg shadow-indigo-500/30 elevation-5"
            />

            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-slate-200" />
              <Text className="mx-4 text-slate-400 font-semibold">OR</Text>
              <View className="flex-1 h-[1px] bg-slate-200" />
            </View>

            <View className="flex-row justify-center mb-10 mt-2">
              <TouchableOpacity className="w-14 h-14 rounded-full border border-[#DB4437] items-center justify-center mx-3 bg-white shadow-sm elevation-3" activeOpacity={0.8}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 rounded-full border border-[#4267B2] items-center justify-center mx-3 bg-white shadow-sm elevation-3" activeOpacity={0.8}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 rounded-full border border-[#000000] items-center justify-center mx-3 bg-white shadow-sm elevation-3" activeOpacity={0.8}>
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="items-center"
              onPress={() => router.push("/auth/register")}
              activeOpacity={0.7}
            >
              <Text className="text-slate-600 text-[15px]">
                Don't have an account? <Text className="text-secondary font-bold">Create Account</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10 bg-slate-100 p-4 rounded-2xl border border-slate-200">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={18} color="#6366f1" />
              <Text className="text-[14px] font-bold text-primary ml-2">Demo Credentials</Text>
            </View>
            <View className="space-y-1">
              <Text className="text-[12px] text-slate-600">• Admin: <Text className="font-bold text-secondary">admin</Text>@test.com</Text>
              <Text className="text-[12px] text-slate-600">• Teacher: <Text className="font-bold text-secondary">teacher</Text>@test.com</Text>
              <Text className="text-[12px] text-slate-600">• Student: any other email</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}