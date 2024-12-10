import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: { gap: 28 },
  logo: { width: 40, height: 40 },
  titles: { gap: 12 },
  title: { fontFamily: fontFamily.bold, fontSize: 24, color: colors.gray[600] },
  subtitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
});
