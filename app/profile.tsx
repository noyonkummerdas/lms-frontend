import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

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
      <Navbar title="Profile" />

      <ScrollView className="flex-1 p-4">
        <Card className="mb-6 items-center">
          <View className="w-20 h-20 bg-secondary rounded-full items-center justify-center mb-4">
            <Text className="text-[36px]">👤</Text>
          </View>
          <Text className="text-2xl font-bold text-primary mb-1">{user?.name}</Text>
          <Text className="text-slate-600 mb-2">{user?.email}</Text>
          <View className="bg-success/20 px-3 py-1 rounded-full">
            <Text className="text-success font-bold text-[12px] capitalize">{user?.role}</Text>
          </View>
        </Card>

        <Text className="text-lg font-bold text-primary mb-3">Information</Text>

        <Card className="mb-3">
          <Text className="text-[12px] text-slate-500 mb-1">User ID</Text>
          <Text className="text-primary font-bold">{user?.id}</Text>
        </Card>

        <Card className="mb-3">
          <Text className="text-[12px] text-slate-500 mb-1">Member Since</Text>
          <Text className="text-primary font-bold">
            {new Date(user?.createdAt || "").toLocaleDateString()}
          </Text>
        </Card>

        <Card className="mb-6">
          <Text className="text-[12px] text-slate-500 mb-1">Last Updated</Text>
          <Text className="text-primary font-bold">
            {new Date(user?.updatedAt || "").toLocaleDateString()}
          </Text>
        </Card>

        <Text className="text-lg font-bold text-primary mb-3">Statistics</Text>

        <View className="flex-row mb-6 mx-[-4px]">
          <Card className="flex-1 mx-1 p-3">
            <Text className="text-[28px] text-center mb-2 text-primary font-black">12</Text>
            <Text className="text-[10px] text-center text-slate-600">Enrolled Courses</Text>
          </Card>
          <Card className="flex-1 mx-1 p-3">
            <Text className="text-[28px] text-center mb-2 text-primary font-black">3</Text>
            <Text className="text-[10px] text-center text-slate-600">Certificates</Text>
          </Card>
          <Card className="flex-1 mx-1 p-3">
            <Text className="text-[28px] text-center mb-2 text-primary font-black">65%</Text>
            <Text className="text-[10px] text-center text-slate-600">Avg Progress</Text>
          </Card>
        </View>

        <Button label="Edit Profile" onPress={() => router.push("/student/profile" as any)} variant="secondary" className="mb-3" />
        <Button label="View Certificates" onPress={() => router.push("/student/certificates" as any)} variant="primary" className="mb-3" />
        <Button label="Account Settings" onPress={() => router.push("/student/profile" as any)} variant="success" className="mb-6" />
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
