import { useState, useMemo, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Card, Button } from "../../../components";
import { COLORS } from "../../../constants/colors";
import * as ScreenOrientation from 'expo-screen-orientation';

const INITIAL_MODULES = [
    {
        id: "m1",
        title: "Module 1: Getting Started",
        lessons: [
            { id: "1", title: "Introduction to the Course", duration: "05:20", completed: true },
            { id: "2", title: "Setting up Environment", duration: "12:45", completed: true },
        ]
    },
    {
        id: "m2",
        title: "Module 2: Core Concepts",
        lessons: [
            { id: "3", title: "Project Structure Explained", duration: "08:15", completed: false },
            { id: "4", title: "Understanding Components", duration: "15:30", completed: false },
            { id: "5", title: "State & Props Deep Dive", duration: "22:10", completed: false },
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
    const [activeLesson, setActiveLesson] = useState(allLessons[2]);
    const [showCompletion, setShowCompletion] = useState(false);
    const [activeTab, setActiveTab] = useState("Lessons");
    const [videoProgress, setVideoProgress] = useState(45);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!isFullscreen) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
            setIsFullscreen(true);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            setIsFullscreen(false);
        }
    };

    // New Completion Flow States
    const [quizScore, setQuizScore] = useState<number | null>(null);
    const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);

    // Feature Logic States
    const [noteText, setNoteText] = useState("");
    const [pastNotes, setPastNotes] = useState<{ id: string, lesson: string, text: string, time: string }[]>([]);
    const [discussionText, setDiscussionText] = useState("");
    const [discussions, setDiscussions] = useState(MOCK_QA);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleSaveNote = () => {
        if (!noteText.trim()) return;
        const newNote = {
            id: Date.now().toString(),
            lesson: activeLesson.title,
            text: noteText,
            time: "2:45" // Mock timestamp
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
        if (!discussionText.trim()) return;
        const newPost = { user: "Me", question: discussionText, reply: null as any };
        const updated = { ...discussions, [activeLesson.id]: [newPost, ...(discussions[activeLesson.id as keyof typeof discussions] || [])] };
        setDiscussions(updated as any);
        setDiscussionText("");
    };

    const isAllLessonsCompleted = useMemo(() => allLessons.every(l => l.completed), [allLessons]);
    const isQuizPassed = useMemo(() => quizScore !== null && (quizScore / 3) * 100 >= 70, [quizScore]);

    const isAllCompleted = useMemo(() =>
        isAllLessonsCompleted && isQuizPassed && isAssignmentSubmitted,
        [isAllLessonsCompleted, isQuizPassed, isAssignmentSubmitted]);

    // Simulate video progress when playing
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
        // Reset progress for new lesson unless it's already completed
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
            const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
            if (currentIndex < allLessons.length - 1) {
                const nextLesson = allLessons[currentIndex + 1];
                setActiveLesson(nextLesson);
                setVideoProgress(nextLesson.completed ? 100 : 0);
            }
        }
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title={title || "Now Learning"} showBack={true} onBackPress={() => router.back()} />

            <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideo]}>
                <View style={styles.videoPlaceholder}>
                    <Ionicons
                        name={isPlaying ? "pause-circle" : "play-circle"}
                        size={isFullscreen ? 120 : 80}
                        color={COLORS.white}
                        onPress={() => setIsPlaying(!isPlaying)}
                    />
                    <Text style={[styles.videoOverlayText, isFullscreen && { fontSize: 18 }]}>
                        {videoProgress === 100 ? "✓ Lesson Finished" : isPlaying ? "Watching..." : "Tapped to Play"}
                    </Text>
                </View>

                {/* Video Watermark */}
                <View style={[styles.watermarkContainer, isFullscreen && styles.fullscreenWatermark]}>
                    <Text style={[styles.watermarkText, isFullscreen && { fontSize: 14 }]}>user_7829 • techsoul.lms</Text>
                </View>

                <View style={[styles.controls, isFullscreen && styles.fullscreenControls]}>
                    <TouchableOpacity style={styles.controlBtn} onPress={() => setIsPlaying(!isPlaying)}>
                        <Ionicons name={isPlaying ? "pause" : "play"} size={isFullscreen ? 32 : 28} color={COLORS.white} />
                    </TouchableOpacity>

                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${videoProgress}%` }]} />
                    </View>

                    <Text style={[styles.timeText, isFullscreen && { fontSize: 14 }]}>
                        {videoProgress === 100 ? activeLesson.duration : `${Math.floor((videoProgress / 100) * parseInt(activeLesson.duration.split(':')[0]))}:${(Math.floor((videoProgress / 100) * 60)).toString().padStart(2, '0')}`} / {activeLesson.duration}
                    </Text>

                    <TouchableOpacity style={[styles.controlBtn, { marginLeft: 12 }]} onPress={toggleFullscreen}>
                        <Ionicons name={isFullscreen ? "contract" : "expand"} size={isFullscreen ? 28 : 24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>

            {!isFullscreen && (
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.infoSection}>
                        <View style={styles.titleRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.activeTitle}>{activeLesson.title}</Text>
                                <Text style={styles.courseName}>{title || "Full Course Curriculum"}</Text>
                            </View>
                            {!activeLesson.completed ? (
                                <TouchableOpacity
                                    style={[
                                        styles.completeBtn,
                                        { backgroundColor: videoProgress < 65 ? 'black' : videoProgress < 100 ? 'tomato' : COLORS.secondary }
                                    ]}
                                    onPress={handleCompleteLesson}
                                >
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
                                    <Text style={styles.completeBtnText}>Complete Lesson</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.alreadyCompletedBadge}>
                                    <Ionicons name="checkmark-done-circle" size={24} color={COLORS.success} />
                                    <Text style={styles.alreadyCompletedText}>Finished</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.tabBar}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
                            {["Lessons", "Overview", "Q&A", "Notes", "Assessments"].map(tab => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={[styles.tab, styles.liveTab]}
                                onPress={() => Alert.alert("Join Live Class", "The Zoom session will start at 8:00 PM. Link: zoom.us/j/12345678")}
                            >
                                <View style={styles.liveIndicator} />
                                <Text style={[styles.tabText, { color: COLORS.danger }]}>Live</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.tab, { backgroundColor: isDownloaded ? COLORS.success + "10" : COLORS.primary + "10" }]}
                                onPress={handleDownload}
                                disabled={isDownloading || isDownloaded}
                            >
                                <Ionicons
                                    name={isDownloaded ? "cloud-done" : isDownloading ? "sync" : "cloud-download-outline"}
                                    size={16}
                                    color={isDownloaded ? COLORS.success : COLORS.primary}
                                />
                                <Text style={[styles.tabText, { color: isDownloaded ? COLORS.success : COLORS.primary, marginLeft: 4 }]}>
                                    {isDownloaded ? "Saved" : isDownloading ? "Download..." : "Download"}
                                </Text>
                            </TouchableOpacity>

                            {isAllCompleted && (
                                <TouchableOpacity
                                    style={[styles.tab, { backgroundColor: COLORS.success + "15" }]}
                                    onPress={() => setShowCompletion(true)}
                                >
                                    <Ionicons name="ribbon" size={16} color={COLORS.success} />
                                    <Text style={[styles.tabText, { color: COLORS.success, marginLeft: 4 }]}>Certificate</Text>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>

                    {activeTab === "Lessons" && (
                        <View style={styles.lessonList}>
                            {modules.map((module) => (
                                <View key={module.id} style={styles.moduleContainer}>
                                    <View style={styles.moduleHeader}>
                                        <Text style={styles.moduleTitle}>{module.title}</Text>
                                        <Text style={styles.moduleMeta}>{module.lessons.length} Lessons</Text>
                                    </View>
                                    {module.lessons.map((lesson) => (
                                        <TouchableOpacity
                                            key={lesson.id}
                                            style={[
                                                styles.lessonItem,
                                                activeLesson.id === lesson.id && styles.activeLessonItem
                                            ]}
                                            onPress={() => handleLessonPress(lesson)}
                                        >
                                            <View style={[styles.lessonStatus, lesson.completed && styles.statusCompleted]}>
                                                {lesson.completed ? (
                                                    <Ionicons name="checkmark" size={14} color={COLORS.white} />
                                                ) : (
                                                    <Text style={styles.lessonNumber}>{lesson.id}</Text>
                                                )}
                                            </View>
                                            <View style={styles.lessonInfo}>
                                                <Text style={[
                                                    styles.lessonTitle,
                                                    activeLesson.id === lesson.id && styles.activeLessonTitle
                                                ]}>
                                                    {lesson.title}
                                                </Text>
                                                <Text style={styles.lessonDuration}>
                                                    <Ionicons name="time-outline" size={12} color={COLORS.gray[400]} /> {lesson.duration}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    {activeTab === "Q&A" && (
                        <View style={styles.qaContainer}>
                            <View style={styles.discussionHeader}>
                                <Text style={styles.qaTitle}>Discussion Forum</Text>
                                <TouchableOpacity style={styles.filterBtn}>
                                    <Text style={styles.filterText}>Popular</Text>
                                    <Ionicons name="chevron-down" size={14} color={COLORS.gray[500]} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.qaInputRow}>
                                <TextInput
                                    placeholder="Ask a question or start a discussion..."
                                    style={styles.qaInput}
                                    value={discussionText}
                                    onChangeText={setDiscussionText}
                                />
                                <TouchableOpacity style={styles.qaSend} onPress={handlePostDiscussion}>
                                    <Ionicons name="send" size={20} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>

                            {(discussions[activeLesson.id as keyof typeof discussions] || []).map((q: any, i: number) => (
                                <Card key={i} style={styles.qaCard}>
                                    <View style={styles.qaHeader}>
                                        <View style={styles.qaAvatar}><Text style={styles.qaAvatarText}>{q.user[0]}</Text></View>
                                        <View style={{ flex: 1, marginLeft: 8 }}>
                                            <Text style={styles.qaUser}>{q.user}</Text>
                                            <Text style={styles.qaTime}>Just now</Text>
                                        </View>
                                        <TouchableOpacity style={styles.likeBtn}>
                                            <Ionicons name="heart-outline" size={16} color={COLORS.gray[400]} />
                                            <Text style={styles.likeText}>0</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.qaQuestion}>{q.question}</Text>
                                    {q.reply && (
                                        <View style={styles.qaReply}>
                                            <Ionicons name="return-down-forward" size={16} color={COLORS.secondary} />
                                            <View style={styles.replyContent}>
                                                <Text style={styles.qaReplyText}>{q.reply}</Text>
                                            </View>
                                        </View>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    {activeTab === "Notes" && (
                        <View style={styles.notesContainer}>
                            <View style={styles.notesHeader}>
                                <Text style={styles.notesTitle}>My Private Notes</Text>
                                <Text style={styles.notesSubtitle}>Taking notes for: {activeLesson.title}</Text>
                            </View>
                            <Card style={styles.notesCard}>
                                <TextInput
                                    multiline
                                    placeholder="Take a note for this lesson..."
                                    style={styles.notesInput}
                                    placeholderTextColor={COLORS.gray[400]}
                                    value={noteText}
                                    onChangeText={setNoteText}
                                />
                                <View style={styles.notesFooter}>
                                    <Text style={styles.timestampText}>Auto-timestamp: 02:45</Text>
                                    <TouchableOpacity style={styles.saveNoteBtn} onPress={handleSaveNote}>
                                        <Text style={styles.saveNoteText}>Save Note</Text>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                            <View style={styles.pastNotes}>
                                <Text style={styles.pastNotesTitle}>Recent Notes</Text>
                                {pastNotes.length === 0 ? (
                                    <Text style={{ color: COLORS.gray[400], fontStyle: 'italic', marginTop: 10 }}>No notes saved for this course yet.</Text>
                                ) : (
                                    pastNotes.map((note) => (
                                        <Card key={note.id} style={styles.pastNoteItem}>
                                            <Text style={styles.pastNoteTag}>{note.lesson} • {note.time}</Text>
                                            <Text style={styles.pastNoteText}>{note.text}</Text>
                                        </Card>
                                    ))
                                )}
                            </View>
                        </View>
                    )}

                    {activeTab === "Assessments" && (
                        <View style={styles.assessmentList}>
                            <TouchableOpacity
                                style={[styles.assessmentCard, isQuizPassed && styles.assessmentCardDone]}
                                onPress={() => {
                                    if (!isAllLessonsCompleted) {
                                        Alert.alert("Locked", "Finish all video lessons first!");
                                        return;
                                    }
                                    // Simulate finishing quiz with 3/3
                                    setQuizScore(3);
                                    Alert.alert("Quiz Passed", "Score: 3/3 (100%)");
                                }}
                            >
                                <View style={[styles.assessmentIcon, { backgroundColor: isQuizPassed ? COLORS.success + "15" : COLORS.secondary + "15" }]}>
                                    <Ionicons name={isQuizPassed ? "checkmark-circle" : "help-circle"} size={24} color={isQuizPassed ? COLORS.success : COLORS.secondary} />
                                </View>
                                <View style={styles.assessmentInfo}>
                                    <Text style={styles.assessmentName}>Module Quiz</Text>
                                    <Text style={styles.assessmentMeta}>{isQuizPassed ? "Result: Passed" : "3 Questions • 5 Minutes"}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.gray[300]} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.assessmentCard, isAssignmentSubmitted && styles.assessmentCardDone]}
                                onPress={() => {
                                    if (!isQuizPassed) {
                                        Alert.alert("Locked", "Pass the Module Quiz first!");
                                        return;
                                    }
                                    setIsAssignmentSubmitted(true);
                                    Alert.alert("Success", "Assignment submitted successfully!");
                                }}
                            >
                                <View style={[styles.assessmentIcon, { backgroundColor: isAssignmentSubmitted ? COLORS.success + "15" : COLORS.warning + "15" }]}>
                                    <Ionicons name={isAssignmentSubmitted ? "checkmark-circle" : "document-text"} size={24} color={isAssignmentSubmitted ? COLORS.success : COLORS.warning} />
                                </View>
                                <View style={styles.assessmentInfo}>
                                    <Text style={styles.assessmentName}>Assignment Submission</Text>
                                    <Text style={styles.assessmentMeta}>{isAssignmentSubmitted ? "Status: Submitted" : "Practical Task • Due Oct 30"}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.gray[300]} />
                            </TouchableOpacity>

                            {/* Score Summary Box */}
                            {(isQuizPassed || isAssignmentSubmitted) && (
                                <View style={styles.scoreSummaryBox}>
                                    <Text style={styles.scoreSummaryTitle}>Final Score Board</Text>
                                    <View style={styles.scoreRow}>
                                        <Text style={styles.scoreLabel}>Quiz Performance:</Text>
                                        <Text style={styles.scoreValueText}>{isQuizPassed ? "100%" : "---"}</Text>
                                    </View>
                                    <View style={styles.scoreRow}>
                                        <Text style={styles.scoreLabel}>Assignment Status:</Text>
                                        <Text style={styles.scoreValueText}>{isAssignmentSubmitted ? "Submitted" : "Pending"}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}

                    {activeTab === "Overview" && (
                        <View style={styles.overviewContainer}>
                            <Text style={styles.overviewTitle}>About this lesson</Text>
                            <Text style={styles.overviewText}>
                                In this lesson, we will cover the core concepts of {activeLesson.title}.
                                Make sure to follow along with the provided source code and join the Q&A if you have any doubts.
                            </Text>
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            )}

            <Modal visible={showCompletion} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <Card style={styles.modalCard}>
                        <View style={styles.successIconBox}>
                            <Ionicons name="ribbon" size={60} color={COLORS.success} />
                        </View>
                        <Text style={styles.modalTitle}>Course Completed!</Text>
                        <Text style={styles.modalSub}>You have successfully mastered</Text>
                        <Text style={styles.modalCourseName}>{title || "the course"}</Text>

                        {/* Styled Certificate Preview */}
                        <View style={styles.certPreviewBox}>
                            <View style={styles.certBorder}>
                                <Ionicons name="medal" size={40} color={COLORS.warning} />
                                <Text style={styles.certVerifyName}>CERTIFICATE OF COMPLETION</Text>
                                <View style={styles.certDivider} />
                                <Text style={styles.certUserName}>John Doe</Text>
                                <Text style={styles.certCourseTitle}>{title || "Full Stack Web Development"}</Text>
                                <View style={styles.certFooter}>
                                    <Text style={styles.certId}>ID: TECH-LMS-2024-X12</Text>
                                    <Text style={styles.certDate}>Oct 23, 2024</Text>
                                </View>
                            </View>
                        </View>

                        <Button
                            label="Download Certificate"
                            onPress={() => Alert.alert("Download", "Your high-resolution PDF certificate is being prepared...")}
                            variant="primary"
                            style={styles.modalBtn}
                        />
                        <TouchableOpacity style={styles.closeModal} onPress={() => setShowCompletion(false)}>
                            <Text style={styles.closeModalText}>Maybe Later</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.white },
    videoContainer: { width: "100%", aspectRatio: 16 / 9, backgroundColor: COLORS.primary },
    fullscreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        aspectRatio: undefined,
        zIndex: 100,
    },
    videoPlaceholder: { flex: 1, alignItems: "center", justifyContent: "center" },
    videoOverlayText: { color: COLORS.white, marginTop: 12, fontSize: 13, fontWeight: "600", opacity: 0.8 },
    watermarkContainer: { position: "absolute", top: 15, right: 15, backgroundColor: "rgba(255,255,255,0.1)", padding: 4, borderRadius: 4 },
    fullscreenWatermark: { top: 30, right: 40, padding: 8 },
    watermarkText: { color: "rgba(255,255,255,0.3)", fontSize: 9, fontWeight: "700" },
    controls: { position: "absolute", bottom: 0, left: 0, right: 0, height: 50, backgroundColor: "rgba(0,0,0,0.6)", flexDirection: "row", alignItems: "center", paddingHorizontal: 16 },
    fullscreenControls: { height: 80, paddingHorizontal: 40, paddingBottom: 20 },
    controlBtn: { padding: 4 },
    progressTrack: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 2, marginHorizontal: 12 },
    progressFill: { height: "100%", backgroundColor: COLORS.secondary, borderRadius: 2 },
    timeText: { color: COLORS.white, fontSize: 10, fontWeight: "700" },
    content: { flex: 1 },
    infoSection: { padding: 20, borderBottomWidth: 1, borderBottomColor: COLORS.gray[100] },
    titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    activeTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
    courseName: { fontSize: 13, color: COLORS.secondary, marginTop: 4, fontWeight: "700" },
    completeBtn: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.secondary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    disabledBtn: { backgroundColor: COLORS.gray[300], opacity: 0.6 },
    completeBtnText: { color: COLORS.white, fontSize: 12, fontWeight: "700", marginLeft: 4 },
    alreadyCompletedBadge: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.success + "10", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    alreadyCompletedText: { fontSize: 13, fontWeight: "800", color: COLORS.success, marginLeft: 6 },
    tabBar: { backgroundColor: COLORS.gray[50], paddingVertical: 12 },
    tabScroll: { paddingHorizontal: 16 },
    tab: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, flexDirection: "row", alignItems: "center" },
    activeTab: { backgroundColor: COLORS.white, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
    tabText: { fontSize: 13, fontWeight: "600", color: COLORS.gray[500] },
    activeTabText: { color: COLORS.secondary },
    liveTab: { backgroundColor: COLORS.danger + "10" },
    liveIndicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.danger, marginRight: 6 },
    lessonList: { padding: 16 },
    moduleContainer: { marginBottom: 24 },
    moduleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingHorizontal: 4 },
    moduleTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    moduleMeta: { fontSize: 12, fontWeight: "600", color: COLORS.gray[400] },
    lessonItem: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 16, marginBottom: 12, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray[100] },
    activeLessonItem: { borderColor: COLORS.secondary, backgroundColor: COLORS.secondary + "05" },
    lessonStatus: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.gray[100], alignItems: "center", justifyContent: "center", marginRight: 16 },
    statusCompleted: { backgroundColor: COLORS.success },
    lessonNumber: { fontSize: 12, fontWeight: "700", color: COLORS.gray[400] },
    lessonInfo: { flex: 1 },
    lessonTitle: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
    activeLessonTitle: { color: COLORS.secondary },
    lessonDuration: { fontSize: 12, color: COLORS.gray[400], marginTop: 4, fontWeight: "500" },
    qaContainer: { padding: 20 },
    discussionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    qaTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    filterBtn: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: COLORS.gray[100] },
    filterText: { fontSize: 12, color: COLORS.gray[600], fontWeight: "600", marginRight: 4 },
    qaInputRow: { flexDirection: "row", marginBottom: 24 },
    qaInput: { flex: 1, backgroundColor: COLORS.gray[50], padding: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.gray[100] },
    qaSend: { backgroundColor: COLORS.secondary, padding: 12, borderRadius: 12, marginLeft: 8, justifyContent: "center" },
    qaCard: { padding: 16, marginBottom: 12 },
    qaHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    qaAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.secondary + "20", alignItems: "center", justifyContent: "center" },
    qaAvatarText: { fontSize: 10, fontWeight: "800", color: COLORS.secondary },
    qaUser: { fontSize: 13, fontWeight: "700", color: COLORS.primary },
    qaTime: { fontSize: 11, color: COLORS.gray[400], marginTop: 1 },
    likeBtn: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.gray[50], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
    likeText: { fontSize: 11, fontWeight: "700", color: COLORS.gray[500], marginLeft: 4 },
    qaQuestion: { fontSize: 14, color: COLORS.gray[700], lineHeight: 20 },
    qaReply: { marginTop: 12, borderTopWidth: 1, borderTopColor: COLORS.gray[50], paddingTop: 10, flexDirection: "row" },
    replyContent: { flex: 1, marginLeft: 8 },
    qaReplyText: { fontSize: 13, color: COLORS.secondary, fontWeight: "500" },
    notesContainer: { padding: 20 },
    notesHeader: { marginBottom: 16 },
    notesTitle: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
    notesSubtitle: { fontSize: 12, color: COLORS.gray[400], marginTop: 2 },
    notesCard: { padding: 16, marginBottom: 24 },
    notesInput: { fontSize: 14, color: COLORS.primary, lineHeight: 22, minHeight: 120, textAlignVertical: "top" },
    notesFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.gray[50] },
    timestampText: { fontSize: 11, color: COLORS.gray[400], fontWeight: "600" },
    saveNoteBtn: { backgroundColor: COLORS.secondary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
    saveNoteText: { color: COLORS.white, fontWeight: "700", fontSize: 13 },
    pastNotes: { marginTop: 8 },
    pastNotesTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 12 },
    pastNoteItem: { padding: 16, marginBottom: 12 },
    pastNoteTag: { fontSize: 11, fontWeight: "700", color: COLORS.secondary, marginBottom: 8, textTransform: "uppercase" },
    pastNoteText: { fontSize: 13, color: COLORS.gray[600], lineHeight: 18 },
    overviewContainer: { padding: 20 },
    overviewTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 12 },
    overviewText: { fontSize: 14, color: COLORS.gray[600], lineHeight: 22 },
    assessmentList: { padding: 16 },
    assessmentCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.gray[100]
    },
    assessmentCardDone: { borderColor: COLORS.success, backgroundColor: COLORS.success + "05" },
    assessmentIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16
    },
    assessmentInfo: { flex: 1 },
    assessmentName: { fontSize: 15, fontWeight: "700", color: COLORS.primary },
    assessmentMeta: { fontSize: 12, color: COLORS.gray[500], marginTop: 4 },
    scoreSummaryBox: { marginTop: 24, padding: 20, backgroundColor: COLORS.gray[50], borderRadius: 20, borderWidth: 1, borderColor: COLORS.gray[100] },
    scoreSummaryTitle: { fontSize: 16, fontWeight: "900", color: COLORS.primary, marginBottom: 16 },
    scoreRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    scoreLabel: { fontSize: 14, color: COLORS.gray[500], fontWeight: "600" },
    scoreValueText: { fontSize: 14, color: COLORS.primary, fontWeight: "800" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalCard: { width: "100%", alignItems: "center", padding: 32 },
    successIconBox: { width: 80, height: 80, backgroundColor: COLORS.warning + "15", borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 20 },
    modalTitle: { fontSize: 22, fontWeight: "900", color: COLORS.primary, marginBottom: 8 },
    modalSub: { fontSize: 14, color: COLORS.gray[500], marginBottom: 4 },
    modalCourseName: { fontSize: 16, fontWeight: "700", color: COLORS.secondary, marginBottom: 20, textAlign: "center" },
    certPreviewBox: {
        width: "100%",
        padding: 12,
        backgroundColor: "#FDFCF0",
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#EEE8AA",
    },
    certBorder: {
        padding: 16,
        borderWidth: 2,
        borderColor: COLORS.warning,
        borderStyle: "dashed",
        alignItems: "center",
        borderRadius: 8,
    },
    certVerifyName: { fontSize: 10, fontWeight: "800", color: COLORS.gray[400], marginVertical: 8, letterSpacing: 1 },
    certDivider: { width: 40, height: 1.5, backgroundColor: COLORS.warning, marginVertical: 8 },
    certUserName: { fontSize: 18, fontWeight: "900", color: COLORS.primary, marginBottom: 4 },
    certCourseTitle: { fontSize: 12, color: COLORS.gray[500], fontStyle: "italic", marginBottom: 12 },
    certFooter: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 8 },
    certId: { fontSize: 8, color: COLORS.gray[400], fontWeight: "700" },
    certDate: { fontSize: 8, color: COLORS.gray[400], fontWeight: "700" },
    modalBtn: { width: "100%", height: 52, borderRadius: 14 },
    closeModal: { marginTop: 20 },
    closeModalText: { fontSize: 13, fontWeight: "700", color: COLORS.gray[400] }
});
