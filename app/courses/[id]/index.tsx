import { View, Text, ScrollView, Alert, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Navbar, Card, Button } from "../../../components";
import { Ionicons } from "@expo/vector-icons";

export default function CourseDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        id: string;
        price?: string;
        instructor?: string;
        title?: string;
        image?: string;
        color?: string;
    }>();

    const mockDetails = {
        description: "Learn the fundamentals of this course with deep-dive lessons, hands-on projects, and expert mentorship. Perfect for students looking to advance their skills to a professional level.",
        lessons: 24,
        duration: "12 Hours",
        level: "Intermediate"
    };

    const currentPrice = params.price || "$49.99";
    const currentTitle = params.title || "Course Details";

    const handleEnroll = () => {
        const isFree = currentPrice === "FREE" || currentPrice === "$0.00";
        if (isFree) {
            Alert.alert(
                "Free Enrollment",
                `Would you like to enroll in "${currentTitle}" for free?`,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Enroll Now",
                        onPress: () => {
                            Alert.alert("Success", "You have successfully enrolled in this course!");
                            router.replace("/(app)/student/courses");
                        }
                    }
                ]
            );
        } else {
            router.push({
                pathname: "/courses/[id]/checkout",
                params: { id: params.id, title: currentTitle, price: currentPrice }
            } as any);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <Navbar title={currentTitle} showBack={true} onBackPress={() => router.back()} />

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                <Card className="mb-6 items-center p-6 mt-4">
                    <View
                        className="w-[120px] h-[120px] rounded-[24px] overflow-hidden mb-4 items-center justify-center"
                        style={{ backgroundColor: (params.color || "#6366f1") + "15" }}
                    >
                        {params.image ? (
                            <Image source={{ uri: params.image }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <Text className="text-[40px]">📚</Text>
                        )}
                    </View>
                    <Text className="text-2xl font-extrabold text-primary text-center mb-2">{currentTitle}</Text>
                    <Text className="text-[15px] text-slate-500 mb-4">by {params.instructor || "Expert Instructor"}</Text>
                    <View className="bg-secondary px-4 py-2 rounded-xl">
                        <Text className="text-white font-extrabold text-[18px]">{currentPrice}</Text>
                    </View>
                </Card>

                <Text className="text-[18px] font-extrabold text-primary mb-4">Course Overview</Text>
                <Card className="mb-6 p-5">
                    <Text className="text-[15px] text-slate-600 leading-6">{mockDetails.description}</Text>
                </Card>

                <View className="flex-row mb-8">
                    <Card className="flex-1 mx-2 items-center p-4">
                        <Text className="text-[20px] font-extrabold text-primary">{mockDetails.lessons}</Text>
                        <Text className="text-[13px] text-slate-400 mt-1 font-semibold">Lessons</Text>
                    </Card>
                    <Card className="flex-1 mx-2 items-center p-4">
                        <Text className="text-[20px] font-extrabold text-primary">{mockDetails.duration}</Text>
                        <Text className="text-[13px] text-slate-400 mt-1 font-semibold">Duration</Text>
                    </Card>
                </View>

                <View className="flex-row items-center bg-indigo-50/50 p-4 rounded-2xl mb-6 border border-indigo-100">
                    <Ionicons name="sparkles" size={20} color="#6366f1" />
                    <Text className="ml-2 color-secondary font-bold text-[14px]">Available with PRO Subscription</Text>
                </View>

                <Text className="text-[18px] font-extrabold text-primary mb-4">Reviews & Ratings</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 ml-[-16px] pl-4">
                    {[1, 2, 3].map((r) => (
                        <Card key={r} className="w-[280px] mr-4 p-4">
                            <View className="flex-row items-center mb-3">
                                <View className="w-10 h-10 rounded-full bg-slate-200 mr-3" />
                                <View>
                                    <Text className="text-[14px] font-bold text-primary">User {r}</Text>
                                    <View className="flex-row mt-0.5">
                                        {[1, 2, 3, 4, 5].map(s => <Ionicons key={s} name="star" size={12} color="#f59e0b" />)}
                                    </View>
                                </View>
                            </View>
                            <Text className="text-[13px] text-slate-600 leading-[18px]">This course is amazing! The lessons are clear and easy to follow.</Text>
                        </Card>
                    ))}
                </ScrollView>

                <View className="mb-3">
                    <Button
                        label={currentPrice === "FREE" || currentPrice === "$0.00" ? "Enroll for Free" : `Unlock Course - ${currentPrice}`}
                        onPress={handleEnroll}
                        variant="primary"
                        className="h-14 rounded-2xl"
                    />
                </View>
                <Button
                    label="Browse Other Courses"
                    onPress={() => router.back()}
                    variant="secondary"
                    className="h-14 rounded-2xl bg-white border border-border"
                />
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
