import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { InstructorNavbar, Card, Button, Input } from "../../../components";
import { COLORS } from "../../../constants/colors";

export default function CreateCourseScreen() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <InstructorNavbar title={t('createNewCourse')} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.stepsRow}>
          <View style={[styles.stepDot, styles.stepActive]}><Text style={styles.stepNum}>1</Text></View>
          <View style={styles.stepLine} />
          <View style={styles.stepDot}><Text style={styles.stepNumInactive}>2</Text></View>
          <View style={styles.stepLine} />
          <View style={styles.stepDot}><Text style={styles.stepNumInactive}>3</Text></View>
        </View>

        <Text style={styles.sectionTitle}>{t('courseBasics')}</Text>
        <Card style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('courseTitle')}</Text>
            <Input placeholder={t('titlePlaceholder')} value="" onChangeText={() => { }} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>{t('category')}</Text>
            <TouchableOpacity style={styles.selectBox} activeOpacity={0.7} onPress={() => { }}>
              <Text style={styles.selectText}>{t('selectCategory')}</Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.gray[400]} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>{t('price')} ($)</Text>
              <Input placeholder="0.00" keyboardType="numeric" value="" onChangeText={() => { }} />
            </View>
            <View style={[styles.field, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>{t('level')}</Text>
              <TouchableOpacity style={styles.selectBox} activeOpacity={0.7} onPress={() => { }}>
                <Text style={styles.selectText}>{t('beginner')}</Text>
              </TouchableOpacity>
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
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>{t('thumbnailImage')}</Text>
        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => { }}>
          <Ionicons name="cloud-upload-outline" size={40} color={COLORS.secondary} />
          <Text style={styles.uploadTitle}>{t('uploadThumbnail')}</Text>
          <Text style={styles.uploadLimit}>{t('maxSize')}</Text>
        </TouchableOpacity>

        <Button
          label={t('saveContinue')}
          variant="primary"
          size="lg"
          style={styles.submitBtn}
          onPress={() => { }}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
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
});
