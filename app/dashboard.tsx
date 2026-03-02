import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks";
import { Navbar, Card, ProgressBar } from "../components";

export default function DashboardScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-primary font-bold mb-4">Not authenticated</Text>
        <TouchableOpacity
          className="bg-secondary px-6 py-3 rounded-lg"
          onPress={() => router.push("/auth/login")}
        >
          <Text className="text-white font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Navbar title="Dashboard" />

      <ScrollView className="flex-1 p-4">
        <Card className="mb-6">
          <Text className="text-2xl font-bold text-primary mb-2">Welcome, {user?.name}! 👋</Text>
          <Text className="text-slate-600">
            Role: <Text className="font-bold capitalize">{user?.role}</Text>
          </Text>
        </Card>

        <View className="mb-6">
          <Text className="text-lg font-bold text-primary mb-3">Your Progress</Text>

          <Card className="mb-3">
            <Text className="text-sm font-semibold text-slate-600 mb-2">Course 1</Text>
            <ProgressBar progress={65} showLabel={true} />
          </Card>

          <Card className="mb-3">
            <Text className="text-sm font-semibold text-slate-600 mb-2">Course 2</Text>
            <ProgressBar progress={45} showLabel={true} />
          </Card>

          <Card>
            <Text className="text-sm font-semibold text-slate-600 mb-2">Course 3</Text>
            <ProgressBar progress={80} showLabel={true} />
          </Card>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-primary mb-3">Quick Access</Text>

          <TouchableOpacity className="bg-secondary rounded-lg p-4 mb-3" onPress={() => router.push("/student/explore" as any)}>
            <Text className="text-white font-semibold">📚 Browse Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-success rounded-lg p-4 mb-3" onPress={() => router.push("/student/profile" as any)}>
            <Text className="text-white font-semibold">👤 My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-warning rounded-lg p-4 mb-3" onPress={() => router.push("/student/profile" as any)}>
            <Text className="text-white font-semibold">⚙️ Settings</Text>
          </TouchableOpacity>
        </View>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
