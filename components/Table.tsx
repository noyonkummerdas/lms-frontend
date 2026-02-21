import { View, ScrollView, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface Column {
  key: string;
  label: string;
}

interface Row {
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  rows: Row[];
  style?: ViewStyle;
}

export default function Table({ columns, rows, style }: TableProps) {
  return (
    <ScrollView horizontal style={[styles.wrapper, style]}>
      <View>
        <View style={styles.header}>
          {columns.map((col) => (
            <View key={col.key} style={styles.headerCell}>
              <Text style={styles.headerText}>{col.label}</Text>
            </View>
          ))}
        </View>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {columns.map((col) => (
              <View key={`${rowIndex}-${col.key}`} style={styles.cell}>
                <Text style={styles.cellText}>{row[col.key]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  header: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
  },
  headerCell: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  headerText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 100,
    borderRightWidth: 1,
    borderRightColor: COLORS.light,
  },
  cellText: { color: COLORS.primary, fontSize: 14 },
});
