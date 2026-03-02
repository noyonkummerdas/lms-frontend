import { View, ScrollView, Text, ViewStyle } from "react-native";

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
  className?: string;
}

export default function Table({ columns, rows, style, className }: TableProps) {
  return (
    <ScrollView horizontal style={style} className={`mb-4 ${className}`} showsHorizontalScrollIndicator={false}>
      <View className="rounded-xl overflow-hidden border border-slate-100">
        <View className="flex-row bg-primary">
          {columns.map((col) => (
            <View key={col.key} className="px-4 py-3 min-w-[120px] border-r border-white/10">
              <Text className="text-white font-extrabold text-[13px] uppercase tracking-wider">{col.label}</Text>
            </View>
          ))}
        </View>
        {rows.length === 0 ? (
          <View className="p-10 items-center bg-white">
            <Text className="text-slate-400 font-semibold">No data available</Text>
          </View>
        ) : (
          rows.map((row, rowIndex) => (
            <View key={rowIndex} className={`flex-row border-b border-slate-50 bg-white ${rowIndex % 2 === 1 ? 'bg-slate-50/30' : ''}`}>
              {columns.map((col) => (
                <View key={`${rowIndex}-${col.key}`} className="px-4 py-3.5 min-w-[120px] border-r border-slate-50">
                  <Text className="text-primary text-[14px] font-medium">{String(row[col.key])}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
