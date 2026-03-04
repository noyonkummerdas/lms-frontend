import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { InstructorNavbar, Card, Button, Input, Dropdown } from "../../../components";
import { COLORS } from "../../../constants/colors";
import { useGetCategoriesQuery } from "../../../store/api/categoryApi";
import { useCreateCourseMutation } from "../../../store/api/courseApi";

export default function CreateCourseScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: categories } = useGetCategoriesQuery();
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    level: "beginner",
    description: "",
    thumbnail: null,
    introVideo: "",
    finalAssignment: ""
  });

  const [sections, setSections] = useState([
    {
      id: '1',
      title: '',
      lessons: [{
        id: 'l1',
        title: '',
        duration: '',
        videoUrl: '',
        quiz: Array(5).fill(0).map((_, i) => ({ id: i.toString(), question: '', options: ['', '', '', ''], correct: 0 }))
      }]
    }
  ]);

  const [quizModal, setQuizModal] = useState<{ sIdx: number, lIdx: number } | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<"category" | "level" | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSection = () => {
    setSections([...sections, {
      id: Date.now().toString(),
      title: '',
      lessons: [{
        id: Date.now() + 'l',
        title: '',
        duration: '',
        videoUrl: '',
        quiz: Array(5).fill(0).map((_, i) => ({ id: i.toString(), question: '', options: ['', '', '', ''], correct: 0 }))
      }]
    }]);
  };

  const handleAddLesson = (sectionIdx: number) => {
    const updated = [...sections];
    updated[sectionIdx].lessons.push({
      id: Date.now().toString(),
      title: '',
      duration: '',
      videoUrl: '',
      quiz: Array(5).fill(0).map((_, i) => ({ id: i.toString(), question: '', options: ['', '', '', ''], correct: 0 }))
    });
    setSections(updated);
  };

  const updateSectionTitle = (idx: number, title: string) => {
    const updated = [...sections];
    updated[idx].title = title;
    setSections(updated);
  };

  const updateLesson = (sIdx: number, lIdx: number, field: string, value: string) => {
    const updated = [...sections];
    (updated[sIdx].lessons[lIdx] as any)[field] = value;
    setSections(updated);
  };

  const updateQuiz = (sIdx: number, lIdx: number, qIdx: number, field: string, value: any) => {
    const updated = [...sections];
    const quiz = updated[sIdx].lessons[lIdx].quiz;
    if (field === 'option') {
      quiz[qIdx].options[value.idx] = value.text;
    } else {
      (quiz[qIdx] as any)[field] = value;
    }
    setSections(updated);
  };

  const categoryOptions = categories?.map(cat => ({
    label: cat.name,
    value: cat._id
  })) || [];

  const levelOptions = [
    { label: t('beginner'), value: "beginner" },
    { label: t('intermediate'), value: "intermediate" },
    { label: t('advanced'), value: "advanced" }
  ];

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.title || !formData.category || !formData.description) {
        Alert.alert(t('error'), t('pleaseFillBasics'));
        return false;
      }
    }
    if (currentStep === 2) {
      const hasEmpty = sections.some(s => !s.title || s.lessons.some(l => !l.title));
      if (hasEmpty) {
        Alert.alert(t('error'), t('pleaseFillCurriculum'));
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await createCourse({
        title: formData.title,
        category: formData.category,
        price: Number(formData.price) || 0,
        level: formData.level as any,
        description: formData.description,
        introVideo: formData.introVideo,
        thumbnail: typeof formData.thumbnail === 'string' ? formData.thumbnail : '',
        status: 'pending',
        sections: sections,
        finalAssignment: formData.finalAssignment
      }).unwrap();

      Alert.alert(t('success'), t('courseCreatedSuccess'), [
        { text: "OK", onPress: () => router.push("/instructor/my-courses") }
      ]);
    } catch (error: any) {
      Alert.alert(t('error'), error?.data?.message || t('somethingWentWrong'));
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <InstructorNavbar title={t('createNewCourse')} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Step Indicator */}
          <View style={styles.stepsRow}>
            {[1, 2, 3].map((step, idx) => (
              <View key={step} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.stepDot, currentStep >= step && styles.stepActive]}>
                  <Text style={currentStep >= step ? styles.stepNum : styles.stepNumInactive}>{step}</Text>
                </View>
                {idx < 2 && <View style={[styles.stepLine, currentStep > step && { backgroundColor: COLORS.secondary }]} />}
              </View>
            ))}
          </View>

          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <>
              <Text style={styles.sectionTitle}>{t('courseBasics')}</Text>
              <Card style={styles.formCard}>
                <View style={styles.field}>
                  <Text style={styles.label}>{t('courseTitle')}</Text>
                  <Input
                    placeholder={t('titlePlaceholder')}
                    value={formData.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>{t('category')}</Text>
                  <Dropdown
                    options={categoryOptions}
                    value={formData.category}
                    onSelect={(val) => handleInputChange('category', val)}
                    placeholder={t('selectCategory')}
                    visible={activeDropdown === 'category'}
                    onOpen={() => setActiveDropdown('category')}
                    onClose={() => setActiveDropdown(null)}
                    style={styles.selectBox}
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.label}>{t('price')} ($)</Text>
                    <Input
                      placeholder="0.00"
                      keyboardType="numeric"
                      value={formData.price}
                      onChangeText={(text) => handleInputChange('price', text)}
                    />
                  </View>
                  <View style={[styles.field, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.label}>{t('level')}</Text>
                    <Dropdown
                      options={levelOptions}
                      value={formData.level}
                      onSelect={(val) => handleInputChange('level', val)}
                      placeholder={t('selectLevel')}
                      visible={activeDropdown === 'level'}
                      onOpen={() => setActiveDropdown('level')}
                      onClose={() => setActiveDropdown(null)}
                      style={styles.selectBox}
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>{t('description')}</Text>
                  <TextInput
                    placeholder={t('descPlaceholder')}
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={formData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                  />
                </View>
              </Card>
            </>
          )}

          {/* STEP 2: SYLLABUS / CURRICULUM */}
          {currentStep === 2 && (
            <>
              <Text style={styles.sectionTitle}>{t('courseCurriculum')}</Text>
              {sections.map((section, sIdx) => (
                <Card key={section.id} style={styles.curriculumCard}>
                  <View style={[styles.field, { marginBottom: 15 }]}>
                    <View style={styles.sectionHeaderRow}>
                      <Text style={styles.label}>Section {sIdx + 1}</Text>
                      <TouchableOpacity onPress={() => {
                        const updated = sections.filter((_, i) => i !== sIdx);
                        setSections(updated);
                      }}>
                        <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder="e.g. Introduction to React"
                      style={styles.sectionInput}
                      value={section.title}
                      onChangeText={(text) => updateSectionTitle(sIdx, text)}
                    />
                  </View>

                  {section.lessons.map((lesson, lIdx) => (
                    <View key={lesson.id} style={styles.lessonItemContainer}>
                      <View style={styles.lessonItem}>
                        <Ionicons name="reorder-two" size={20} color={COLORS.gray[300]} />
                        <TextInput
                          placeholder="Lesson title (e.g. Introduction)"
                          style={styles.lessonInput}
                          value={lesson.title}
                          onChangeText={(text) => updateLesson(sIdx, lIdx, 'title', text)}
                        />
                        <TextInput
                          placeholder="5:00"
                          style={styles.durationInput}
                          value={lesson.duration}
                          onChangeText={(text) => updateLesson(sIdx, lIdx, 'duration', text)}
                        />
                        <TouchableOpacity onPress={() => {
                          const updated = [...sections];
                          updated[sIdx].lessons = updated[sIdx].lessons.filter((_, i) => i !== lIdx);
                          setSections(updated);
                        }}>
                          <Ionicons name="close-circle-outline" size={20} color={COLORS.gray[300]} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.videoLinkRow}>
                        <Ionicons name="videocam" size={16} color={COLORS.secondary} />
                        <TextInput
                          placeholder="Video URL (Vimeo, YouTube, or MP4 Link)"
                          style={styles.videoUrlInput}
                          value={lesson.videoUrl}
                          onChangeText={(text) => updateLesson(sIdx, lIdx, 'videoUrl', text)}
                        />
                      </View>

                      <TouchableOpacity
                        style={styles.addQuizBtn}
                        onPress={() => setQuizModal({ sIdx, lIdx })}
                      >
                        <Ionicons name="help-circle-outline" size={16} color={COLORS.secondary} />
                        <Text style={styles.addQuizText}>Setup 5 Questions Quiz</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  <TouchableOpacity style={styles.addLessonBtn} onPress={() => handleAddLesson(sIdx)}>
                    <Ionicons name="add" size={18} color={COLORS.secondary} />
                    <Text style={styles.addLessonText}>{t('addLesson')}</Text>
                  </TouchableOpacity>
                </Card>
              ))}

              <TouchableOpacity style={styles.addSectionContainer} onPress={handleAddSection}>
                <Ionicons name="add-circle" size={24} color={COLORS.secondary} />
                <Text style={styles.addSectionText}>{t('addNewSection')}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* STEP 3: MEDIA & PUBLISH */}
          {currentStep === 3 && (
            <>
              <Text style={styles.sectionTitle}>{t('courseMedia')}</Text>
              <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => { }}>
                <Ionicons name="cloud-upload-outline" size={40} color={COLORS.secondary} />
                <Text style={styles.uploadTitle}>{t('uploadThumbnail')}</Text>
                <Text style={styles.uploadLimit}>{t('maxSize')}</Text>
              </TouchableOpacity>

              <View style={[styles.field, { paddingHorizontal: 4 }]}>
                <Text style={styles.label}>{t('introVideoUrl')}</Text>
                <Input
                  placeholder="https://..."
                  value={formData.introVideo}
                  onChangeText={(text) => handleInputChange('introVideo', text)}
                />
                <Text style={styles.hintText}>{t('introVideoHint')}</Text>
              </View>

              <View style={[styles.field, { paddingHorizontal: 4 }]}>
                <Text style={styles.label}>Final Course Assignment</Text>
                <TextInput
                  placeholder="Write the final assignment instructions here..."
                  style={styles.textArea}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={formData.finalAssignment}
                  onChangeText={(text) => handleInputChange('finalAssignment', text)}
                />
                <Text style={styles.hintText}>Students must complete this to get the certificate.</Text>
              </View>

              <Card style={styles.reviewCard}>
                <Text style={styles.reviewTitle}>{t('reviewCourse')}</Text>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>{t('title')}:</Text>
                  <Text style={styles.reviewValue}>{formData.title}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>{t('price')}:</Text>
                  <Text style={styles.reviewValue}>${formData.price || '0.00'}</Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>{t('level')}:</Text>
                  <Text style={styles.reviewValue} style={{ textTransform: 'capitalize' }}>{formData.level}</Text>
                </View>
              </Card>
            </>
          )}

          <View style={styles.buttonRow}>
            {currentStep > 1 && (
              <Button
                label={t('previous')}
                variant="secondary"
                size="lg"
                style={[styles.navBtn, { marginRight: 10, backgroundColor: COLORS.white, borderWeight: 1, borderColor: COLORS.border }]}
                onPress={() => setCurrentStep(prev => prev - 1)}
              />
            )}
            <Button
              label={currentStep === 3 ? (isCreating ? t('creating') : t('publishCourse')) : t('saveContinue')}
              variant="primary"
              size="lg"
              style={[styles.navBtn, { flex: 1 }]}
              onPress={currentStep === 3 ? handleSubmit : handleNext}
              disabled={isCreating}
            />
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>

        {/* QUIZ MODAL */}
        <Modal visible={!!quizModal} animationType="slide" transparent={true}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Setup Lesson Quiz (5 Questions)</Text>
                  <TouchableOpacity onPress={() => setQuizModal(null)}>
                    <Ionicons name="close" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                  {quizModal && sections[quizModal.sIdx].lessons[quizModal.lIdx].quiz.map((q: any, qIdx: number) => (
                    <View key={q.id} style={styles.quizQuestionCard}>
                      <Text style={styles.questionNum}>Question {qIdx + 1}</Text>
                      <TextInput
                        placeholder="Enter question text..."
                        style={styles.questionInput}
                        value={q.question}
                        onChangeText={(text) => updateQuiz(quizModal.sIdx, quizModal.lIdx, qIdx, 'question', text)}
                      />
                      <View style={styles.optionsGrid}>
                        {q.options.map((opt: string, oIdx: number) => (
                          <View key={oIdx} style={styles.optionItem}>
                            <TouchableOpacity
                              style={[styles.radio, q.correct === oIdx && styles.radioActive]}
                              onPress={() => updateQuiz(quizModal.sIdx, quizModal.lIdx, qIdx, 'correct', oIdx)}
                            />
                            <TextInput
                              placeholder={`Option ${oIdx + 1}`}
                              style={styles.optionInput}
                              value={opt}
                              onChangeText={(text) => updateQuiz(quizModal.sIdx, quizModal.lIdx, qIdx, 'option', { idx: oIdx, text })}
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <Button
                  label="Save Quiz"
                  variant="primary"
                  onPress={() => setQuizModal(null)}
                  style={{ marginTop: 20 }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.light },
  scroll: { flex: 1, padding: 16 },
  stepsRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 32, marginTop: 10 },
  stepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.gray[200], alignItems: "center", justifyContent: "center" },
  stepActive: { backgroundColor: COLORS.secondary },
  stepNum: { color: COLORS.white, fontWeight: "800", fontSize: 13 },
  stepNumInactive: { color: COLORS.gray[500], fontWeight: "800", fontSize: 13 },
  stepLine: { width: 40, height: 2, backgroundColor: COLORS.gray[200], marginHorizontal: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginBottom: 12, marginLeft: 4 },
  formCard: { padding: 16, marginBottom: 24 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "700", color: COLORS.primary, marginBottom: 8 },
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    height: 50
  },
  selectText: { color: COLORS.gray[600], fontSize: 15 },
  row: { flexDirection: "row" },
  textArea: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    height: 120,
    fontSize: 15,
    color: COLORS.primary
  },
  uploadBox: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary + "40",
    borderStyle: "dashed",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32
  },
  uploadTitle: { fontSize: 16, fontWeight: "700", color: COLORS.primary, marginTop: 12 },
  uploadLimit: { fontSize: 12, color: COLORS.gray[400], marginTop: 4 },
  submitBtn: {
    borderRadius: 16,
    height: 56,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  curriculumCard: { padding: 16, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: COLORS.secondary },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  sectionInput: { backgroundColor: COLORS.gray[50], borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15, fontWeight: '700', color: COLORS.primary },
  lessonItemContainer: { marginBottom: 15, backgroundColor: COLORS.gray[50] + "50", borderRadius: 15, padding: 8 },
  lessonItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray[100], borderRadius: 12, padding: 10 },
  lessonInput: { flex: 1, fontSize: 14, color: COLORS.primary, paddingHorizontal: 10 },
  durationInput: { width: 60, fontSize: 12, color: COLORS.gray[400], textAlign: 'right', marginRight: 10 },
  videoLinkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, paddingHorizontal: 10, paddingBottom: 5 },
  videoUrlInput: { flex: 1, fontSize: 12, color: COLORS.secondary, marginLeft: 8, paddingVertical: 4 },
  hintText: { fontSize: 11, color: COLORS.gray[400], marginTop: 5, fontStyle: 'italic' },
  addLessonBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 5 },
  addLessonText: { fontSize: 14, fontWeight: '700', color: COLORS.secondary, marginLeft: 5 },
  addSectionContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 15, marginBottom: 30 },
  addSectionText: { fontSize: 16, fontWeight: '800', color: COLORS.secondary, marginLeft: 10 },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  navBtn: { borderRadius: 15, height: 56 },
  reviewCard: { padding: 20, backgroundColor: COLORS.white, marginBottom: 30 },
  reviewTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary, marginBottom: 15 },
  reviewItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.gray[50], paddingBottom: 10 },
  reviewLabel: { fontSize: 14, color: COLORS.gray[500], fontWeight: '600' },
  reviewValue: { fontSize: 14, color: COLORS.primary, fontWeight: '700' },
  addQuizBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: COLORS.secondary + '10', borderRadius: 8, alignSelf: 'flex-start' },
  addQuizText: { fontSize: 12, fontWeight: '700', color: COLORS.secondary, marginLeft: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, height: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  modalScroll: { flex: 1 },
  quizQuestionCard: { backgroundColor: COLORS.gray[50], borderRadius: 15, padding: 15, marginBottom: 20 },
  questionNum: { fontSize: 14, fontWeight: '800', color: COLORS.secondary, marginBottom: 10 },
  questionInput: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 14, color: COLORS.primary, marginBottom: 15 },
  optionsGrid: { gap: 10 },
  optionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: COLORS.gray[100] },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: COLORS.gray[300] },
  radioActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
  optionInput: { flex: 1, padding: 10, fontSize: 13, color: COLORS.primary },
});
