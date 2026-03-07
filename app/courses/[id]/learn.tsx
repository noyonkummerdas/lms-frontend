import { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, TextInput, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button, VideoPlayer } from "../../../components";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useGetLiveSessionQuery } from "../../../store/api/courseApi";
import { requestNotificationPermissions, scheduleClassReminders } from "../../../utils/notificationHelper";
import * as Notifications from "expo-notifications";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

const INITIAL_MODULES = [
    {
        id: "m1",
        title: "Module 1: Getting Started",
        lessons: [
            { id: "1", title: "Introduction to the Course", duration: "05:20", completed: true, videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
            { id: "2", title: "Setting up Environment", duration: "12:45", completed: true, videoUrl: "https://www.youtube.com/watch?v=9S6_0kioyF8" },
        ]
    },
    {
        id: "m2",
        title: "Module 2: Core Concepts",
        lessons: [
            { id: "3", title: "Project Structure Explained", duration: "08:15", completed: false, videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk" },
            { id: "4", title: "Understanding Components", duration: "15:30", completed: false, videoUrl: "https://www.youtube.com/watch?v=l_vUUp-V2iM" },
            { id: "5", title: "State & Props Deep Dive", duration: "22:10", completed: false, videoUrl: "https://www.youtube.com/watch?v=4pP5p4eYlT0" },
        ]
    },
    {
        id: "m3",
        title: "Module 3: Advanced Topics",
        lessons: [
            { id: "6", title: "Styling with Layouts", duration: "18:00", completed: false },
            { id: "7", title: "Final Project Overview", duration: "10:00", completed: false },
        ]
    }
];

const MOCK_QA = {
    "1": [{ user: "Alex", question: "Is this course for beginners?", reply: "Yes, absolutely!" }],
    "2": [{ user: "Sarah", question: "Which version of Node is required?", reply: "Any version above 16.x is fine." }],
    "3": [{ user: "Mike", question: "Where can I find the source code?", reply: "Check the Resources tab in the overview." }],
};

export default function CoursePlayerScreen() {
    const router = useRouter();
    const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
    const [modules, setModules] = useState(INITIAL_MODULES);
    const allLessons = useMemo(() => modules.flatMap(m => m.lessons), [modules]);
    const [activeLesson, setActiveLesson] = useState(allLessons.length > 0 ? allLessons[0] : null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [activeTab, setActiveTab] = useState("Lessons");
    const [videoProgress, setVideoProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Dynamic Live Session from Backend
    const { data: serverLiveSession } = useGetLiveSessionQuery(id as string, {
        pollingInterval: 30000, // Check every 30s
    });

    const liveSession = useMemo(() => {
        if (serverLiveSession) return serverLiveSession;
        // Fallback demo schedule if no backend data
        return {
            active: true,
            link: "https://meet.google.com/abc-defg-hij",
            startTime: "18:00",
            endTime: "19:30",
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Every day for testing
            topic: "Daily Q&A Session"
        };
    }, [serverLiveSession]);

    const liveStatus = useMemo(() => {
        if (!liveSession?.active) return "NONE";

        const now = new Date();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = days[now.getDay()];

        if (!liveSession.days.includes(today)) return "NONE";

        const [startH, startM] = liveSession.startTime.split(":").map(Number);
        const startTime = new Date();
        startTime.setHours(startH, startM, 0);

        const [endH, endM] = (liveSession.endTime || "23:59").split(":").map(Number);
        const endTime = new Date();
        endTime.setHours(endH, endM, 0);

        const diffStart = (now.getTime() - startTime.getTime()) / 60000;
        const diffEnd = (now.getTime() - endTime.getTime()) / 60000;

        if (diffStart >= -15 && diffEnd <= 5) { // Show from 15m before until 5m after end
            return diffStart < 0 ? "STAGING" : "LIVE";
        }

        return "SCHEDULED";
    }, [liveSession]);

    const handleJoinLive = async () => {
        if (!liveSession?.link) return;
        const supported = await Linking.canOpenURL(liveSession.link);
        if (supported) {
            await Linking.openURL(liveSession.link);
        } else {
            Alert.alert("Error", "Cannot open meeting link.");
        }
    };

    const toggleFullscreen = async () => {
        if (!isFullscreen) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            setIsFullscreen(true);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            setIsFullscreen(false);
        }
    };

    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);

    const [noteText, setNoteText] = useState("");
    const [pastNotes, setPastNotes] = useState<{ id: string, lesson: string, text: string, time: string }[]>([]);
    const [discussionText, setDiscussionText] = useState("");
    const [discussions, setDiscussions] = useState(MOCK_QA);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleSaveNote = () => {
        if (!noteText.trim() || !activeLesson) return;
        const currentLesson = activeLesson;
        const newNote = {
            id: Date.now().toString(),
            lesson: currentLesson.title,
            text: noteText,
            time: "2:45"
        };
        setPastNotes([newNote, ...pastNotes]);
        setNoteText("");
        Alert.alert("Success", "Note saved to this lesson.");
    };

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            setIsDownloaded(true);
            Alert.alert("Complete", "This course is now available offline.");
        }, 2000);
    };

    const handlePostDiscussion = () => {
        if (!discussionText.trim() || !activeLesson) return;
        const currentLesson = activeLesson;
        const newPost = { user: "Me", question: discussionText, reply: null as any };
        const lessonId = currentLesson.id;
        const updated = { ...discussions, [lessonId]: [newPost, ...(discussions[lessonId as keyof typeof discussions] || [])] };
        setDiscussions(updated as any);
        setDiscussionText("");
    };

    const isAllLessonsCompleted = useMemo(() => allLessons.every(l => l.completed), [allLessons]);
    const isQuizPassed = useMemo(() => quizScore !== null && (quizScore / 3) * 100 >= 70, [quizScore]);

    const isAllCompleted = useMemo(() =>
        isAllLessonsCompleted && isQuizPassed && isAssignmentSubmitted,
        [isAllLessonsCompleted, isQuizPassed, isAssignmentSubmitted]);

    useEffect(() => {
        if (liveSession?.active && liveSession.startTime) {
            const setupReminders = async () => {
                const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
                if (isExpoGo) return; // Skip in Expo Go to avoid SDK 54+ errors

                const hasPerm = await requestNotificationPermissions();
                if (hasPerm) {
                    await scheduleClassReminders(title || "Your Course", liveSession.days, liveSession.startTime);
                }
            };
            setupReminders();
        }
    }, [liveSession, title]);

    useEffect(() => {
        let interval: any;
        if (isPlaying && videoProgress < 100) {
            interval = setInterval(() => {
                setVideoProgress(prev => Math.min(prev + 5, 100));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, videoProgress]);

    const handleLessonPress = (lesson: typeof allLessons[0]) => {
        setActiveLesson(lesson);
        setVideoProgress(lesson.completed ? 100 : 0);
        setIsPlaying(false);
    };

    const handleCompleteLesson = () => {
        if (videoProgress < 100) {
            Alert.alert("Warning", "You must watch the full video before marking this lesson as complete.");
            return;
        }

        const updatedModules = modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l =>
                l.id === activeLesson.id ? { ...l, completed: true } : l
            )
        }));
        setModules(updatedModules);

        const updatedAllLessons = updatedModules.flatMap(m => m.lessons);
        if (updatedAllLessons.every(l => l.completed)) {
            setShowCompletion(true);
        } else {
            const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
            if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
                const nextLesson = allLessons[currentIndex + 1];
                setActiveLesson(nextLesson);
                setVideoProgress(nextLesson.completed ? 100 : 0);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <Navbar title={title || "Now Learning"} showBack={true} onBackPress={() => router.back()} />

            <View style={{ zIndex: 50, backgroundColor: 'black' }}>
                <VideoPlayer
                    videoUrl={(activeLesson as any)?.videoUrl}
                />
            </View>

            {!isFullscreen && (
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {liveStatus !== "NONE" && (
                        <TouchableOpacity
                            style={[styles.liveBanner, liveStatus === "STAGING" && { backgroundColor: '#0ea5e9', shadowColor: '#0ea5e9' }]}
                            onPress={handleJoinLive}
                            activeOpacity={0.9}
                        >
                            <View style={styles.liveBannerPulse}>
                                <Ionicons name={liveStatus === "LIVE" ? "videocam" : "time-outline"} size={24} color="white" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.liveBannerTitle}>
                                    {liveStatus === "LIVE" ? "Live Class is Active!" : "Class Starting Soon!"}
                                </Text>
                                <Text style={styles.liveBannerSubtitle}>
                                    {liveStatus === "LIVE"
                                        ? `Topic: ${liveSession?.topic || 'Curriculum Discussion'}`
                                        : `Starts at ${liveSession?.startTime} today`}
                                </Text>
                            </View>
                            <View style={styles.liveBannerButton}>
                                <Text style={[styles.liveBannerButtonText, liveStatus === "STAGING" && { color: '#0ea5e9' }]}>
                                    {liveStatus === "LIVE" ? "Join Now" : "Ready"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    <View className="p-5 border-b border-slate-100">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="text-[18px] font-extrabold text-primary">{activeLesson?.title || "Select a Lesson"}</Text>
                                <Text className="text-[13px] text-secondary mt-1 font-bold">{title || "Course Curriculum"}</Text>
                            </View>
                            {activeLesson && !activeLesson.completed ? (
                                <TouchableOpacity
                                    className={`flex-row items-center px-3 py-2 rounded-xl ${videoProgress < 65 ? 'bg-black' : videoProgress < 100 ? 'bg-rose-500' : 'bg-secondary'}`}
                                    onPress={handleCompleteLesson}
                                >
                                    <Ionicons name="checkmark-circle" size={20} color="white" />
                                    <Text className="text-white text-[12px] font-bold ml-1">Complete</Text>
                                </TouchableOpacity>
                            ) : activeLesson?.completed ? (
                                <View className="flex-row items-center bg-success/10 px-3 py-2 rounded-xl">
                                    <Ionicons name="checkmark-done-circle" size={24} color="#10b981" />
                                    <Text className="text-[13px] font-extrabold text-success ml-1.5">Finished</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>

                    <View style={styles.tabBarWrapper}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                            {["Lessons", "Overview", "Q&A", "Notes", "Assessments"].map(tab => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[
                                        styles.tabItem,
                                        activeTab === tab && styles.tabItemActive
                                    ]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text style={[
                                        styles.tabItemText,
                                        activeTab === tab && styles.tabItemTextActive
                                    ]}>{tab}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={[styles.tabItem, { backgroundColor: '#fff1f2' }]}
                                onPress={handleJoinLive}
                            >
                                <View style={styles.liveIndicator} />
                                <Text style={[styles.tabItemText, { color: '#f43f5e' }]}>Live Session</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.tabItem, isDownloaded ? { backgroundColor: '#f0fdf4' } : { backgroundColor: '#f0f9ff' }]}
                                onPress={handleDownload}
                                disabled={isDownloading || isDownloaded}
                            >
                                <Ionicons
                                    name={isDownloaded ? "cloud-done" : isDownloading ? "sync" : "cloud-download-outline"}
                                    size={16}
                                    color={isDownloaded ? "#10b981" : "#0f172a"}
                                />
                                <Text style={[styles.tabItemText, { marginLeft: 4 }, isDownloaded && { color: '#10b981' }]}>
                                    {isDownloaded ? "Saved" : isDownloading ? "Download..." : "Download"}
                                </Text>
                            </TouchableOpacity>

                            {isAllCompleted && (
                                <TouchableOpacity
                                    className="px-4 py-2 mr-2 rounded-full flex-row items-center bg-success/15"
                                    onPress={() => setShowCompletion(true)}
                                >
                                    <Ionicons name="ribbon" size={16} color="#10b981" />
                                    <Text className="text-[13px] font-semibold text-success ml-1">Certificate</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>

                    {activeTab === "Lessons" && (
                        <View className="p-4">
                            {modules.map((module) => (
                                <View key={module.id} className="mb-6">
                                    <View className="flex-row justify-between items-center mb-3 px-1">
                                        <Text className="text-[16px] font-extrabold text-primary">{module.title}</Text>
                                        <Text className="text-[12px] font-semibold text-slate-400">{module.lessons.length} Lessons</Text>
                                    </View>
                                    {module.lessons.map((lesson) => (
                                        <TouchableOpacity
                                            key={lesson.id}
                                            className={`flex-row items-center p-4 rounded-2xl mb-3 bg-white border ${activeLesson?.id === lesson.id ? 'border-secondary bg-indigo-50/20' : 'border-slate-100'}`}
                                            onPress={() => handleLessonPress(lesson)}
                                        >
                                            <View className={`w-7 h-7 rounded-full items-center justify-center mr-4 ${lesson.completed ? 'bg-success' : 'bg-slate-100'}`}>
                                                {lesson.completed ? (
                                                    <Ionicons name="checkmark" size={14} color="white" />
                                                ) : (
                                                    <Text className="text-[12px] font-bold text-slate-400">{lesson.id}</Text>
                                                )}
                                            </View>
                                            <View className="flex-1">
                                                <Text className={`text-[15px] font-bold ${activeLesson?.id === lesson.id ? 'text-secondary' : 'text-primary'}`}>
                                                    {lesson.title}
                                                </Text>
                                                <View className="flex-row items-center mt-1">
                                                    <Ionicons name="time-outline" size={12} color="#94a3b8" />
                                                    <Text className="text-[12px] text-slate-400 font-medium ml-1">{lesson.duration}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    {activeTab === "Q&A" && (
                        <View className="p-5">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-[16px] font-extrabold text-primary">Discussion Forum</Text>
                                <TouchableOpacity className="flex-row items-center bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                                    <Text className="text-[12px] text-slate-600 font-semibold mr-1">Popular</Text>
                                    <Ionicons name="chevron-down" size={14} color="#64748b" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row mb-6">
                                <TextInput
                                    placeholder="Ask a question or start a discussion..."
                                    className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100"
                                    value={discussionText}
                                    onChangeText={setDiscussionText}
                                />
                                <TouchableOpacity className="bg-secondary p-3 rounded-xl ml-2 justify-center" onPress={handlePostDiscussion}>
                                    <Ionicons name="send" size={20} color="white" />
                                </TouchableOpacity>
                            </View>

                            {(activeLesson && discussions[activeLesson.id as keyof typeof discussions] || []).map((q: any, i: number) => (
                                <Card key={i} className="p-4 mb-3">
                                    <View className="flex-row items-center mb-2.5">
                                        <View className="w-6 h-6 rounded-full bg-secondary/20 items-center justify-center">
                                            <Text className="text-[10px] font-extrabold text-secondary">{q.user[0]}</Text>
                                        </View>
                                        <View className="flex-1 ml-2">
                                            <Text className="text-[13px] font-bold text-primary">{q.user}</Text>
                                            <Text className="text-[11px] text-slate-400 mt-0.5">Just now</Text>
                                        </View>
                                        <TouchableOpacity className="flex-row items-center bg-slate-50 px-2 py-1 rounded-lg">
                                            <Ionicons name="heart-outline" size={16} color="#94a3b8" />
                                            <Text className="text-[11px] font-bold text-slate-500 ml-1">0</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text className="text-[14px] text-slate-700 leading-5">{q.question}</Text>
                                    {q.reply && (
                                        <View className="mt-3 border-t border-slate-50 pt-2.5 flex-row">
                                            <Ionicons name="return-down-forward" size={16} color="#6366f1" />
                                            <View className="flex-1 ml-2">
                                                <Text className="text-[13px] text-secondary font-medium">{q.reply}</Text>
                                            </View>
                                        </View>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    {activeTab === "Notes" && (
                        <View className="p-5">
                            <View className="mb-4">
                                <Text className="text-[18px] font-extrabold text-primary">My Private Notes</Text>
                                <Text className="text-[12px] text-slate-400 mt-0.5">Taking notes for: {activeLesson.title}</Text>
                            </View>
                            <Card className="p-4 mb-6">
                                <TextInput
                                    multiline
                                    placeholder="Take a note for this lesson..."
                                    className="text-[14px] text-primary leading-6 min-h-[120px] text-start"
                                    placeholderTextColor="#94a3b8"
                                    value={noteText}
                                    onChangeText={setNoteText}
                                />
                                <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-50">
                                    <Text className="text-[11px] text-slate-400 font-semibold">Auto-timestamp: 02:45</Text>
                                    <TouchableOpacity className="bg-secondary px-4 py-2.5 rounded-xl" onPress={handleSaveNote}>
                                        <Text className="text-white font-bold text-[13px]">Save Note</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                            <View>
                                <Text className="text-[16px] font-extrabold text-primary mb-3">Recent Notes</Text>
                                {pastNotes.length === 0 ? (
                                    <Text className="text-slate-400 italic mt-2.5">No notes saved for this course yet.</Text>
                                ) : (
                                    pastNotes.map((note) => (
                                        <Card key={note.id} className="p-4 mb-3">
                                            <Text className="text-[11px] font-bold text-secondary mb-2 uppercase">{note.lesson} • {note.time}</Text>
                                            <Text className="text-[13px] text-slate-600 leading-[18px]">{note.text}</Text>
                                        </Card>
                                    ))
                                )}
                            </View>
                        </View>
                    )}

                    {activeTab === "Assessments" && (
                        <View className="p-4">
                            <TouchableOpacity
                                className={`flex-row items-center bg-white p-4 rounded-2xl mb-3 border ${isQuizPassed ? 'border-success bg-success/5' : 'border-slate-100'}`}
                                onPress={() => {
                                    if (!isAllLessonsCompleted) {
                                        Alert.alert("Locked", "Finish all video lessons first!");
                                        return;
                                    }
                                    setQuizScore(3);
                                    Alert.alert("Quiz Passed", "Score: 3/3 (100%)");
                                }}
                            >
                                <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${isQuizPassed ? 'bg-success/15' : 'bg-secondary/15'}`}>
                                    <Ionicons name={isQuizPassed ? "checkmark-circle" : "help-circle"} size={24} color={isQuizPassed ? "#10b981" : "#6366f1"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[15px] font-bold text-primary">Module Quiz</Text>
                                    <Text className="text-[12px] text-slate-500 mt-1">{isQuizPassed ? "Result: Passed" : "3 Questions • 5 Minutes"}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-row items-center bg-white p-4 rounded-2xl mb-3 border ${isAssignmentSubmitted ? 'border-success bg-success/5' : 'border-slate-100'}`}
                                onPress={() => {
                                    if (!isQuizPassed) {
                                        Alert.alert("Locked", "Pass the Module Quiz first!");
                                        return;
                                    }
                                    setIsAssignmentSubmitted(true);
                                    Alert.alert("Success", "Assignment submitted successfully!");
                                }}
                            >
                                <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${isAssignmentSubmitted ? 'bg-success/15' : 'bg-amber-500/15'}`}>
                                    <Ionicons name={isAssignmentSubmitted ? "checkmark-circle" : "document-text"} size={24} color={isAssignmentSubmitted ? "#10b981" : "#f59e0b"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[15px] font-bold text-primary">Assignment Submission</Text>
                                    <Text className="text-[12px] text-slate-500 mt-1">{isAssignmentSubmitted ? "Status: Submitted" : "Practical Task • Due Oct 30"}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                            </TouchableOpacity>

                            {(isQuizPassed || isAssignmentSubmitted) && (
                                <View className="mt-6 p-5 bg-slate-50 rounded-[20px] border border-slate-100">
                                    <Text className="text-[16px] font-black text-primary mb-4">Final Score Board</Text>
                                    <View className="flex-row justify-between mb-2.5">
                                        <Text className="text-[14px] text-slate-500 font-semibold">Quiz Performance:</Text>
                                        <Text className="text-[14px] text-primary font-extrabold">{isQuizPassed ? "100%" : "---"}</Text>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="text-[14px] text-slate-500 font-semibold">Assignment Status:</Text>
                                        <Text className="text-[14px] text-primary font-extrabold">{isAssignmentSubmitted ? "Submitted" : "Pending"}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                    {activeTab === "Overview" && (
                        <View className="p-5">
                            <Text className="text-[16px] font-extrabold text-primary mb-3">About this lesson</Text>
                            <Text className="text-[14px] text-slate-600 leading-[22px]">
                                In this lesson, we will cover the core concepts of {activeLesson?.title || "the selected topic"}.
                                Make sure to follow along with the provided source code and join the Q&A if you have any doubts.
                            </Text>
                        </View>
                    )}

                    <View className="h-10" />
                </ScrollView>
            )}

            <Modal visible={showCompletion} transparent animationType="slide">
                <View className="flex-1 bg-black/70 justify-center items-center p-5">
                    <Card className="w-full items-center p-8">
                        <View className="w-20 h-20 bg-amber-500/15 rounded-full items-center justify-center mb-5">
                            <Ionicons name="ribbon" size={60} color="#10b981" />
                        </View>
                        <Text className="text-[22px] font-black text-primary mb-2">Course Completed!</Text>
                        <Text className="text-[14px] text-slate-500 mb-1">You have successfully mastered</Text>
                        <Text className="text-[16px] font-bold text-secondary mb-5 text-center">{title || "the course"}</Text>

                        <View className="w-full p-3 bg-[#FDFCF0] rounded-xl mb-6 border border-[#EEE8AA]">
                            <View className="p-4 border-2 border-amber-500 border-dashed items-center rounded-lg">
                                <Ionicons name="medal" size={40} color="#f59e0b" />
                                <Text className="text-[10px] font-extrabold text-slate-400 my-2 tracking-widest">CERTIFICATE OF COMPLETION</Text>
                                <View className="w-10 h-[1.5px] bg-amber-500 my-2" />
                                <Text className="text-[18px] font-black text-primary mb-1">John Doe</Text>
                                <Text className="text-[12px] text-slate-500 italic mb-3">{title || "Full Stack Web Development"}</Text>
                                <View className="flex-row justify-between w-full mt-2">
                                    <Text className="text-[8px] text-slate-400 font-bold">ID: TECH-LMS-2024-X12</Text>
                                    <Text className="text-[8px] text-slate-400 font-bold">Oct 23, 2024</Text>
                                </View>
                            </View>
                        </View>

                        <Button
                            label="Download Certificate"
                            onPress={() => Alert.alert("Download", "Your high-resolution PDF certificate is being prepared...")}
                            variant="primary"
                            className="w-full h-[52px] rounded-xl"
                        />
                        <TouchableOpacity className="mt-5" onPress={() => setShowCompletion(false)}>
                            <Text className="text-[13px] font-bold text-slate-400">Maybe Later</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = {
    tabBarWrapper: {
        backgroundColor: '#f8fafc',
        paddingVertical: 12,
    },
    tabItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 99,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    },
    tabItemActive: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabItemText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: '#64748b',
    },
    tabItemTextActive: {
        color: '#6366f1',
    },
    liveIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#f43f5e',
        marginRight: 6,
    },
    liveBanner: {
        backgroundColor: '#6366f1',
        margin: 16,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    liveBannerPulse: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveBannerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800' as const,
    },
    liveBannerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 2,
    },
    liveBannerButton: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    liveBannerButtonText: {
        color: '#6366f1',
        fontWeight: '800' as const,
        fontSize: 12,
    }
};
