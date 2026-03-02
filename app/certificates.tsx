import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks";
import { Navbar, Card, Button } from "../components";

export default function CertificatesScreen() {
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

  const certificates = [
    { id: "1", course: "React Native Basics", date: "2025-01-15", icon: "📚" },
    { id: "2", course: "Advanced TypeScript", date: "2025-02-01", icon: "💻" },
    { id: "3", course: "Mobile App Design", date: "2025-02-10", icon: "🎨" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Navbar title="My Certificates" showBack={true} onBackPress={() => router.back()} />

      <ScrollView className="flex-1 p-4">
        <Text className="text-[20px] font-bold text-primary mb-4">Your Certificates</Text>

        {certificates.map((cert) => (
          <Card key={cert.id} className="mb-4">
            <View className="flex-row items-center">
              <Text className="text-[36px] mr-4">{cert.icon}</Text>
              <View className="flex-1">
                <Text className="font-bold text-primary text-[18px]">{cert.course}</Text>
                <Text className="text-[14px] text-slate-600 mt-1">
                  Completed: {new Date(cert.date).toLocaleDateString()}
                </Text>
              </View>
              <Text className="text-success text-[24px]">✓</Text>
            </View>
          </Card>
        ))}

        <Button
          label="Back to Profile"
          onPress={() => router.push("/student/profile" as any)}
          variant="secondary"
          className="mt-4"
        />
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
