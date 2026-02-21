import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const theme = StyleSheet.create({
  // Layout
  flex1: { flex: 1 },
  flexRow: { flexDirection: "row" },
  flexCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  flexRowCenter: { flexDirection: "row", alignItems: "center" },
  flexRowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  // Backgrounds
  bgWhite: { backgroundColor: COLORS.white },
  bgLight: { backgroundColor: COLORS.light },
  bgPrimary: { backgroundColor: COLORS.primary },
  bgSecondary: { backgroundColor: COLORS.secondary },
  bgSuccess: { backgroundColor: COLORS.success },
  bgSuccessLight: { backgroundColor: "rgba(16, 185, 129, 0.15)" },
  bgWarning: { backgroundColor: COLORS.warning },
  bgDanger: { backgroundColor: COLORS.danger },
  bgBlack: { backgroundColor: COLORS.black },
  bgOverlay: { backgroundColor: "rgba(0,0,0,0.5)" },

  // Spacing
  p4: { padding: 16 },
  px4: { paddingHorizontal: 16 },
  py3: { paddingVertical: 12 },
  py2: { paddingVertical: 8 },
  py1: { paddingVertical: 4 },
  px1: { paddingHorizontal: 4 },
  mb1: { marginBottom: 4 },
  mb2: { marginBottom: 8 },
  mb3: { marginBottom: 12 },
  mb4: { marginBottom: 16 },
  mb6: { marginBottom: 24 },
  mb8: { marginBottom: 32 },
  mt4: { marginTop: 16 },
  mt8: { marginTop: 32 },
  mr2: { marginRight: 8 },
  mr3: { marginRight: 12 },
  mr4: { marginRight: 16 },
  ml2: { marginLeft: 8 },

  // Border & radius
  rounded: { borderRadius: 8 },
  roundedLg: { borderRadius: 12 },
  roundedFull: { borderRadius: 9999 },
  border: { borderWidth: 1, borderColor: COLORS.border },
  borderSuccess: { borderWidth: 1, borderColor: COLORS.success },

  // Text
  textPrimary: { color: COLORS.primary },
  textSecondary: { color: COLORS.secondary },
  textWhite: { color: COLORS.white },
  textGray: { color: COLORS.gray[600] },
  textGrayLight: { color: COLORS.gray[500] },
  textSuccess: { color: COLORS.success },
  textDanger: { color: COLORS.danger },
  textXs: { fontSize: 12 },
  textSm: { fontSize: 14 },
  textBase: { fontSize: 16 },
  textLg: { fontSize: 18 },
  textXl: { fontSize: 20 },
  text2xl: { fontSize: 24 },
  text4xl: { fontSize: 36 },
  text5xl: { fontSize: 48 },
  fontSemibold: { fontWeight: "600" as const },
  fontBold: { fontWeight: "700" as const },
  textCenter: { textAlign: "center" as const },

  // Input
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.primary,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
  },

  // Navbar
  navbar: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Button sizes
  btnSm: { paddingHorizontal: 12, paddingVertical: 8 },
  btnMd: { paddingHorizontal: 16, paddingVertical: 12 },
  btnLg: { paddingHorizontal: 24, paddingVertical: 16 },
});
