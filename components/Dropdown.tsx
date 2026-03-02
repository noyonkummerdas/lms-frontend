import { Modal, View, Text, TouchableOpacity, ViewStyle } from "react-native";

interface DropdownProps {
  options: { label: string; value: string }[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  visible?: boolean;
  onClose?: () => void;
  style?: ViewStyle;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onSelect,
  placeholder = "Select an option",
  visible = false,
  onClose,
  style,
  className,
}: DropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <>
      <TouchableOpacity
        style={style}
        className={`border border-slate-200 rounded-xl px-4 py-3 bg-white ${className}`}
        activeOpacity={0.7}
        onPress={() => { }}
      >
        <Text className="text-primary font-semibold">{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={onClose}
        >
          <View className="bg-white rounded-t-3xl p-5 pb-10">
            <View className="w-12 h-1 bg-slate-200 rounded-full self-center mb-6" />
            <Text className="text-[18px] font-black text-primary mb-4 ml-1">{placeholder}</Text>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                className="py-4 px-1 border-b border-slate-50 flex-row justify-between items-center"
                activeOpacity={0.7}
                onPress={() => {
                  onSelect(option.value);
                  onClose?.();
                }}
              >
                <Text
                  className={`text-[16px] ${value === option.value ? 'text-secondary font-bold' : 'text-primary'}`}
                >
                  {option.label}
                </Text>
                {value === option.value && (
                  <View className="w-2 h-2 rounded-full bg-secondary" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
