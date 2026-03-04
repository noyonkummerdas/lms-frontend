import { View, Text, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Navbar, Card, Button } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { useGetCourseQuery } from "../../../store/api/courseApi";
import { useEnrollInCourseMutation } from "../../../store/api/enrollmentApi";

export default function CourseDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ id: string }>();
    const { data: course, isLoading } = useGetCourseQuery(params.id as string);
    const [enroll, { isLoading: isEnrolling }] = useEnrollInCourseMutation();

    console.log("[COURSE_DETAIL_DEBUG] Course:", JSON.stringify(course, null, 2));

    const handleEnroll = async () => {
        if (!course) return;

        try {
            const isFree = course.price === 0;
            if (isFree) {
                Alert.alert(
                    "Free Enrollment",
                    `Would you like to enroll in "${course.title}" for free?`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Enroll Now",
                            onPress: async () => {
                                try {
                                    await enroll({ courseId: (course as any)._id || course.id }).unwrap();
                                    Alert.alert("Success", "You have successfully enrolled in this course!");
                                    router.replace("/(app)/student/courses");
                                } catch (err: any) {
                                    Alert.alert("Error", err.data?.message || "Enrollment failed");
                                }
                            }
                        }
                    ]
                );
            } else {
                router.push({
                    pathname: `/courses/${(course as any)._id || course.id}/checkout` as any,
                    params: { title: course.title, price: course.price.toString() }
                });
            }
        } catch (err) {
            console.error("Enrollment error:", err);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <Navbar title={course?.title || "Course Details"} showBack={true} onBackPress={() => router.back()} />

            {isLoading ? (
                <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 40 }} />
            ) : !course ? (
                <View className="items-center mt-10">
                    <Text>Course not found</Text>
                </View>
            ) : (
                <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                    <Card className="mb-6 items-center p-6 mt-4">
                        <View
                            className="w-[120px] h-[120px] rounded-[24px] overflow-hidden mb-4 items-center justify-center bg-secondary/10"
                        >
                            {(course as any).image ? (
                                <Image source={{ uri: (course as any).image }} className="w-full h-full" resizeMode="cover" />
                            ) : (
                                <Text className="text-[40px]">📚</Text>
                            )}
                        </View>
                        <Text className="text-2xl font-extrabold text-primary text-center mb-2">{course.title}</Text>
                        <Text className="text-[15px] text-slate-500 mb-4">by {typeof course.instructor === 'string' ? course.instructor : (course.instructor as any)?.name}</Text>
                        <View className="bg-secondary px-4 py-2 rounded-xl">
                            <Text className="text-white font-extrabold text-[18px]">${course.price}</Text>
                        </View>
                    </Card>

                    <Text className="text-[18px] font-extrabold text-primary mb-4">Course Overview</Text>
                    <Card className="mb-6 p-5">
                        <Text className="text-[15px] text-slate-600 leading-6">{course.description}</Text>
                    </Card>

                    <View className="flex-row mb-8">
                        <Card className="flex-1 mx-2 items-center p-4">
                            <Text className="text-[20px] font-extrabold text-primary">{course.lessonsCount}</Text>
                            <Text className="text-[13px] text-slate-400 mt-1 font-semibold">Lessons</Text>
                        </Card>
                        <Card className="flex-1 mx-2 items-center p-4">
                            <Text className="text-[20px] font-extrabold text-primary">{course.duration}h</Text>
                            <Text className="text-[13px] text-slate-400 mt-1 font-semibold">Duration</Text>
                        </Card>
                    </View>

                    <View className="flex-row items-center bg-indigo-50/50 p-4 rounded-2xl mb-6 border border-indigo-100">
                        <Ionicons name="sparkles" size={20} color="#6366f1" />
                        <Text className="ml-2 text-secondary font-bold text-[14px]">Available with PRO Subscription</Text>
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
                            label={course.price === 0 ? "Enroll for Free" : `Unlock Course - $${course.price}`}
                            onPress={handleEnroll}
                            variant="primary"
                            className="h-14 rounded-2xl"
                            loading={isEnrolling}
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
            )}
        </SafeAreaView>
    );
}
