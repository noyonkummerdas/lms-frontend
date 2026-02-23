import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";

interface DropdownProps {
  options: { label: string; value: string }[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  visible?: boolean;
  onClose?: () => void;
  style?: ViewStyle;
}

export default function Dropdown({
  options,
  value,
  onSelect,
  placeholder = "Select an option",
  visible = false,
  onClose,
  style,
}: DropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <>
      <TouchableOpacity style={[styles.trigger, style]} activeOpacity={0.7} onPress={() => { }}>
        <Text style={styles.triggerText}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                activeOpacity={0.7}
                onPress={() => {
                  onSelect(option.value);
                  onClose?.();
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === option.value && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  triggerText: { color: COLORS.primary },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  optionText: { fontSize: 16, color: COLORS.primary },
  optionTextSelected: { color: COLORS.secondary, fontWeight: "700" },
});
