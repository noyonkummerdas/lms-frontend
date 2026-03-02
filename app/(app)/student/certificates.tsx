import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card } from "../../../components";

const DATA = [
    { id: "1", title: "React Native Basics", date: "Jan 12, 2024", id_code: "CERT-9921-X", icon: "logo-react", color: "#61DAFB" },
    { id: "2", title: "Mastering TypeScript", date: "Feb 05, 2024", id_code: "CERT-4412-Y", icon: "code-slash", color: "#3178C6" },
    { id: "3", title: "UI/UX Foundations", date: "Feb 20, 2024", id_code: "CERT-1102-Z", icon: "color-palette", color: "#FF6B6B" },
];

export default function CertificatesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <Navbar title="My Certificates" showBack={true} onBackPress={() => router.back()} />

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="mb-6 mt-4">
                    <Text className="text-2xl font-extrabold text-primary">Your Achievements</Text>
                    <Text className="text-[14px] text-slate-500 mt-1">You have earned {DATA.length} professional certificates.</Text>
                </View>

                {DATA.map((item) => (
                    <Card key={item.id} className="flex-row items-center p-4 mb-4 bg-white">
                        <View
                            className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
                            style={{ backgroundColor: item.color + "15" }}
                        >
                            <Ionicons name={item.icon as any} size={32} color={item.color} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[16px] font-bold text-primary mb-1">{item.title}</Text>
                            <Text className="text-[12px] text-slate-400 mb-0.5">Issued on {item.date}</Text>
                            <Text className="text-[11px] font-bold text-secondary uppercase">ID: {item.id_code}</Text>
                        </View>
                        <TouchableOpacity
                            className="p-2 rounded-xl bg-secondary/10"
                            onPress={() => Alert.alert("Download", "Preparing your high-resolution PDF certificate...")}
                        >
                            <Ionicons name="download-outline" size={24} color="#6366f1" />
                        </TouchableOpacity>
                    </Card>
                ))}

                <View className="mt-8 items-center p-6 bg-white rounded-3xl">
                    <Text className="text-[18px] font-extrabold text-primary mb-2">Share Your Success</Text>
                    <Text className="text-[14px] text-slate-500 text-center mb-5">Show the world your new skills on LinkedIn or Twitter!</Text>
                    <TouchableOpacity className="flex-row items-center bg-secondary px-6 py-3.5 rounded-2xl">
                        <Ionicons name="share-social-outline" size={20} color="white" />
                        <Text className="text-white font-bold text-[15px] ml-2">Share All Certificates</Text>
                    </TouchableOpacity>
                </View>
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
