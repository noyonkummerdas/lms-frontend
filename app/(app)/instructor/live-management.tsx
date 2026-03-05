import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Platform, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { InstructorNavbar, Card, Button } from "../../../components";
import { useUpdateLiveSessionMutation, useGetInstructorCoursesQuery } from "../../../store/api/courseApi";
import { requestNotificationPermissions, scheduleClassReminders } from "../../../utils/notificationHelper";
import * as Notifications from "expo-notifications";

export default function LiveManagementScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { data: courses } = useGetInstructorCoursesQuery();
    const [updateLive] = useUpdateLiveSessionMutation();

    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [link, setLink] = useState("");
    const [startTime, setStartTime] = useState("18:00");
    const [endTime, setEndTime] = useState("19:30");
    const [isActive, setIsActive] = useState(true);
    const [selectedDays, setSelectedDays] = useState<string[]>(["Sun", "Tue", "Thu"]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSave = async () => {
        if (!selectedCourse) {
            Alert.alert("Error", "Please select a course first");
            return;
        }
        if (!link.includes("http")) {
            Alert.alert("Error", "Please enter a valid meeting link");
            return;
        }

        try {
            await updateLive({
                courseId: selectedCourse,
                data: {
                    active: isActive,
                    link,
                    startTime,
                    endTime,
                    days: selectedDays,
                    topic: "Live Class Session"
                }
            }).unwrap();

            // Scheduling Reminder for Teacher (Automated Reminder)
            const hasPermission = await requestNotificationPermissions();
            if (hasPermission) {
                const targetCourse = courses?.find(c => (c.id || c._id) === selectedCourse);
                await Notifications.cancelAllScheduledNotificationsAsync(); // Cancel old ones to simplify update
                await scheduleClassReminders(targetCourse?.title || "My Class", selectedDays, startTime);
                Alert.alert("Success", "Schedule updated! You will get a reminder 15 mins before each class.");
            } else {
                Alert.alert("Success", "Schedule updated! (But reminders are disabled without permission)");
            }
        } catch (err) {
            Alert.alert("Error", "Failed to update live session. Make sure the backend endpoint is ready.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-light" edges={["top"]}>
            <InstructorNavbar title="Live Management" />

            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-[24px] font-extrabold text-primary">Schedule Live Classes</Text>
                    <Text className="text-slate-500 mt-1">Set your meeting link and class timing for students.</Text>
                </View>

                {/* Course Selection */}
                <Text className="text-[15px] font-bold text-primary mb-3">Select Course</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    {courses?.map((course: any) => (
                        <TouchableOpacity
                            key={course.id || course._id}
                            onPress={() => setSelectedCourse(course.id || course._id)}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 12,
                                backgroundColor: selectedCourse === (course.id || course._id) ? '#6366f1' : 'white',
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: selectedCourse === (course.id || course._id) ? '#6366f1' : '#e2e8f0',
                            }}
                        >
                            <Text style={{
                                color: selectedCourse === (course.id || course._id) ? 'white' : '#64748b',
                                fontWeight: '700'
                            }}>
                                {course.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Settings Card */}
                <Card className="p-5 mb-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-[16px] font-bold text-primary">Live Status</Text>
                            <Text className="text-[12px] text-slate-500">Toggle this to enable/disable the live banner</Text>
                        </View>
                        <Switch
                            value={isActive}
                            onValueChange={setIsActive}
                            trackColor={{ false: "#cbd5e1", true: "#6366f1" }}
                        />
                    </View>

                    <View className="mb-5">
                        <Text className="text-[14px] font-bold text-slate-700 mb-2">Meeting Link (Google Meet / Zoom)</Text>
                        <TextInput
                            className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-primary"
                            placeholder="https://meet.google.com/..."
                            value={link}
                            onChangeText={setLink}
                        />
                    </View>

                    <View className="mb-5">
                        <Text className="text-[14px] font-bold text-slate-700 mb-2">Start Time (24h Format)</Text>
                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl p-2">
                            <Ionicons name="time-outline" size={20} color="#6366f1" className="ml-2" />
                            <TextInput
                                className="flex-1 p-2 text-primary font-bold"
                                placeholder="18:00"
                                value={startTime}
                                onChangeText={setStartTime}
                            />
                        </View>
                    </View>

                    <View className="mb-5">
                        <Text className="text-[14px] font-bold text-slate-700 mb-2">End Time (24h Format)</Text>
                        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl p-2">
                            <Ionicons name="time-outline" size={20} color="#ef4444" className="ml-2" />
                            <TextInput
                                className="flex-1 p-2 text-primary font-bold"
                                placeholder="19:30"
                                value={endTime}
                                onChangeText={setEndTime}
                            />
                        </View>
                    </View>

                    <View className="mb-2">
                        <Text className="text-[14px] font-bold text-slate-700 mb-3">Repeats on</Text>
                        <View className="flex-row flex-wrap">
                            {days.map(day => (
                                <TouchableOpacity
                                    key={day}
                                    onPress={() => toggleDay(day)}
                                    className={`w-[45px] h-[45px] rounded-full items-center justify-center mr-2 mb-2 border ${selectedDays.includes(day) ? 'bg-secondary border-secondary' : 'bg-white border-slate-200'}`}
                                >
                                    <Text className={`text-[12px] font-bold ${selectedDays.includes(day) ? 'text-white' : 'text-slate-500'}`}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Card>

                <Button
                    variant="primary"
                    onPress={handleSave}
                    className="mb-10"
                    label="Update Schedule"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
