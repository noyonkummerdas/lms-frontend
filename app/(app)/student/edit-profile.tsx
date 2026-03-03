import { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Navbar, Button } from "../../../components";
import { useAuth } from "../../../hooks";

export default function EditProfileScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState("+880 1712-345678");
    const [bio, setBio] = useState("Passionate learner exploring React Native and Fullstack development.");

    const handleSave = () => {
        Alert.alert(t('success'), t('profileUpdated'));
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <Navbar title={t('editProfile')} showBack={true} onBackPress={() => router.back()} />

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="items-center mb-8 mt-4">
                    <View className="w-[120px] h-[120px] rounded-full bg-secondary items-center justify-center mb-3 relative">
                        <Text className="text-[48px] font-extrabold text-white">{name.charAt(0) || "S"}</Text>
                        <TouchableOpacity className="absolute bottom-1 right-1 bg-primary w-9 h-9 rounded-full items-center justify-center border-[3px] border-white">
                            <Ionicons name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[14px] text-secondary font-bold">{t('changeProfilePhoto')}</Text>
                </View>

                <View className="mb-8">
                    <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('fullName')}</Text>
                    <TextInput
                        className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[16px] text-primary mb-4"
                        value={name}
                        onChangeText={setName}
                        placeholder={t('enterName')}
                    />

                    <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('email')}</Text>
                    <TextInput
                        className="bg-slate-100 p-4 rounded-xl border border-slate-100 text-[16px] text-slate-400 mb-4"
                        value={email}
                        editable={false}
                    />
                    <Text className="text-[12px] text-slate-400 -mt-3 mb-4 ml-1">{t('emailCannotBeChanged')}</Text>

                    <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('phoneNumber')}</Text>
                    <TextInput
                        className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[16px] text-primary mb-4"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Text className="text-[14px] font-bold text-primary mb-2 ml-1">{t('aboutMe')}</Text>
                    <TextInput
                        className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[16px] text-primary h-24 text-start"
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <Button
                    label={t('saveChanges')}
                    onPress={handleSave}
                    variant="primary"
                    className="h-14 rounded-2xl"
                />
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}
