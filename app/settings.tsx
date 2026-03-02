import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";

export default function SettingsScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-primary font-bold mb-4">Not logged in</Text>
        <Button label="Go to Login" onPress={() => router.push("/auth/login")} variant="secondary" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Navbar title="Settings" showBack={true} onBackPress={() => router.back()} />

      <ScrollView className="flex-1 p-4">
        <Text className="text-[20px] font-bold text-primary mb-4">Account Settings</Text>

        <Card className="mb-4">
          <Text className="font-bold text-primary mb-2">Profile</Text>
          <Text className="text-[14px] text-slate-600 mb-3">Update your profile information</Text>
          <Button label="Edit Profile" onPress={() => router.push("/student/profile" as any)} variant="secondary" />
        </Card>

        <Card className="mb-4">
          <Text className="font-bold text-primary mb-2">Notifications</Text>
          <Text className="text-[14px] text-slate-600 mb-3">Manage notification preferences</Text>
          <Text className="text-[14px] text-success font-semibold">Notifications enabled</Text>
        </Card>

        <Card className="mb-4">
          <Text className="font-bold text-primary mb-2">Security</Text>
          <Text className="text-[14px] text-slate-600 mb-3">Change password and security settings</Text>
          <Button label="Change Password" onPress={() => { }} variant="primary" />
        </Card>

        <Card className="mb-8">
          <Text className="font-bold text-primary mb-2">About</Text>
          <Text className="text-[14px] text-slate-600">LMS App v1.0.0</Text>
        </Card>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
