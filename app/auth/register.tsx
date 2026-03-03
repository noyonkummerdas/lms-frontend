import { View, Text, ScrollView, Alert, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input } from "../../components";
import { useRegisterMutation } from "../../store/api/authApi";
import { setUser, setToken } from "../../store/slices/authSlice";
import { validateForm } from "../../utils/validateForm";
import { AppDispatch } from "../../store/store";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components";

type RegisterRole = "student" | "instructor";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      console.log("[REGISTER_DEBUG] Sending request:", { name, email, role });
      const result = await register({ name: name.trim(), email, password, role }).unwrap();
      console.log("[REGISTER_SUCCESS] User registered:", JSON.stringify(result.user, null, 2));
      console.log("[REGISTER_SUCCESS] Token received:", result.token);

      dispatch(setUser(result.user as any));
      dispatch(setToken(result.token));

      if (result.user.role === "admin") router.replace("/admin" as any);
      else if (result.user.role === "instructor") router.replace("/instructor" as any);
      else router.replace("/student" as any);

      Alert.alert(t('createAccount'), `${t('welcome')}, ${result.user.name}!`);
    } catch (error: any) {
      console.error("[REGISTER_ERROR] Details:", JSON.stringify(error, null, 2));
      Alert.alert("Registration Failed", error?.data?.message || error?.message || "Could not create account");
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
          contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View className="mb-8" style={{ opacity: fadeAnim }}>
            <View className="absolute top-0 right-0 z-50">
              <LanguageSwitcher />
            </View>
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center mb-5 shadow shadow-black/10 elevation-2"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>
            <Text className="text-[28px] font-extrabold text-primary mb-2">{t('createAccountTitle')}</Text>
            <Text className="text-[16px] text-slate-500">{t('joinCommunity')}</Text>
          </Animated.View>

          <View className="mb-8">
            <Text className="text-[14px] font-bold text-primary mb-4 ml-1">{t('joinAs')}</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`w-[48%] bg-white rounded-2xl p-4 items-center border-[1.5px] shadow-sm elevation-2 ${role === "student" ? 'border-secondary' : 'border-slate-100'}`}
                onPress={() => setRole("student")}
                activeOpacity={0.7}
              >
                <View className={`w-14 h-14 rounded-full items-center justify-center mb-3 ${role === "student" ? 'bg-secondary' : 'bg-slate-50'}`}>
                  <Ionicons name="school" size={28} color={role === "student" ? "white" : "#94a3b8"} />
                </View>
                <Text className={`text-[15px] font-bold ${role === "student" ? 'text-secondary' : 'text-slate-500'}`}>{t('student')}</Text>
                {role === "student" && <Ionicons name="checkmark-circle" size={20} color="#6366f1" className="absolute top-2 right-2" />}
              </TouchableOpacity>

              <TouchableOpacity
                className={`w-[48%] bg-white rounded-2xl p-4 items-center border-[1.5px] shadow-sm elevation-2 ${role === "instructor" ? 'border-secondary' : 'border-slate-100'}`}
                onPress={() => setRole("instructor")}
                activeOpacity={0.7}
              >
                <View className={`w-14 h-14 rounded-full items-center justify-center mb-3 ${role === "instructor" ? 'bg-secondary' : 'bg-slate-50'}`}>
                  <Ionicons name="briefcase" size={28} color={role === "instructor" ? "white" : "#94a3b8"} />
                </View>
                <Text className={`text-[15px] font-bold ${role === "instructor" ? 'text-secondary' : 'text-slate-500'}`}>{t('instructor')}</Text>
                {role === "instructor" && <Ionicons name="checkmark-circle" size={20} color="#6366f1" className="absolute top-2 right-2" />}
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full">
            <View className="mb-5">
              <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('fullName')}</Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3">
                <Ionicons name="person-outline" size={20} color="#94a3b8" className="mr-2" />
                <Input
                  className="flex-1"
                  placeholder="John Doe"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors((e) => ({ ...e, name: "" }));
                  }}
                />
              </View>
              {errors.name && <Text className="text-rose-500 text-[12px] mt-1 ml-3">{errors.name}</Text>}
            </View>

            <View className="mb-5">
              <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('email')}</Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3">
                <Ionicons name="mail-outline" size={20} color="#94a3b8" className="mr-2" />
                <Input
                  className="flex-1"
                  placeholder="john@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((e) => ({ ...e, email: "" }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text className="text-rose-500 text-[12px] mt-1 ml-3">{errors.email}</Text>}
            </View>

            <View className="mb-5">
              <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('password')}</Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3">
                <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" className="mr-2" />
                <Input
                  className="flex-1"
                  placeholder={t('password')}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((e) => ({ ...e, password: "" }));
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  className="p-1"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-[12px] text-slate-500 mt-1.5 ml-1">Must be at least 6 characters</Text>
              {errors.password && <Text className="text-rose-500 text-[12px] mt-1 ml-3">{errors.password}</Text>}
            </View>

            <Button
              label={isLoading ? t('creatingAccount') : t('createAccount')}
              onPress={handleRegister}
              disabled={isLoading}
              variant="primary"
              className="h-14 rounded-2xl bg-secondary mt-2 shadow-lg shadow-indigo-500/30 elevation-5"
            />

            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-slate-200" />
              <Text className="mx-4 text-slate-400 font-semibold">{t('or')}</Text>
              <View className="flex-1 h-[1px] bg-slate-200" />
            </View>

            <View className="flex-row justify-center mb-6 mt-2">
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
              className="items-center mt-6"
              onPress={() => router.push("/auth/login")}
              activeOpacity={0.7}
            >
              <Text className="text-slate-600 text-[15px]">
                {t('alreadyHaveAccount')} <Text className="text-secondary font-bold">{t('signIn')}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
