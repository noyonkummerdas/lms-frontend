import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Navbar, Button, Card } from "../../../components";
import { useAuth } from "../../../hooks";
import { COLORS } from "../../../constants/colors";

export default function EditProfileScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState("+880 1712-345678");
    const [bio, setBio] = useState("Passionate learner exploring React Native and Fullstack development.");

    const handleSave = () => {
        Alert.alert("Success", "Profile updated successfully!");
        router.back();
    };

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <Navbar title="Edit Profile" showBack={true} onBackPress={() => router.back()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarText}>{name.charAt(0) || "S"}</Text>
                        <TouchableOpacity style={styles.changeBtn}>
                            <Ionicons name="camera" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changeLabel}>Change Profile Photo</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />

                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={email}
                        editable={false}
                    />
                    <Text style={styles.helperText}>Email cannot be changed.</Text>

                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.inputLabel}>About Me</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <Button
                    label="Save Changes"
                    onPress={handleSave}
                    variant="primary"
                    style={styles.saveBtn}
                />
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: COLORS.white },
    scroll: { flex: 1, padding: 20 },
    avatarSection: { alignItems: "center", marginBottom: 32 },
    avatarLarge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12
    },
    avatarText: { fontSize: 48, fontWeight: "800", color: COLORS.white },
    changeBtn: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: COLORS.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: COLORS.white
    },
    changeLabel: { fontSize: 14, color: COLORS.secondary, fontWeight: "700" },
    form: { marginBottom: 32 },
    inputLabel: { fontSize: 14, fontWeight: "700", color: COLORS.primary, marginBottom: 8 },
    input: {
        backgroundColor: COLORS.gray[50],
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
        fontSize: 16,
        color: COLORS.primary,
        marginBottom: 16
    },
    disabledInput: { color: COLORS.gray[400], backgroundColor: COLORS.gray[100] },
    helperText: { fontSize: 12, color: COLORS.gray[400], marginTop: -12, marginBottom: 16 },
    textArea: { height: 100, textAlignVertical: "top" },
    saveBtn: { height: 56, borderRadius: 16 }
});
