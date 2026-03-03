import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language || "en");
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Sync local state if i18n changes externally
        if (i18n.language !== currentLang) {
            setCurrentLang(i18n.language);
        }
    }, [i18n.language]);

    const toggleLanguage = async () => {
        const nextLang = currentLang === "en" ? "bn" : "en";

        // Animate button press
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Change language using i18n instance
        await i18n.changeLanguage(nextLang);
        setCurrentLang(nextLang);

        // Explicitly save to ensure persistence
        try {
            await AsyncStorage.setItem('settings.lang', nextLang);
        } catch (e) {
            console.log('Failed to save language preference', e);
        }
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
                style={styles.container}
                onPress={toggleLanguage}
                activeOpacity={0.8}
            >
                <Ionicons name="language" size={16} color={COLORS.secondary} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={[styles.langText, currentLang === "en" && styles.activeText]}>
                        EN
                    </Text>
                    <Text style={styles.separator}>/</Text>
                    <Text style={[styles.langText, currentLang === "bn" && styles.activeText]}>
                        বাংলা
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: COLORS.gray[100],
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 6,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    langText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.gray[400],
    },
    activeText: {
        color: COLORS.primary,
        fontWeight: "800",
    },
    separator: {
        fontSize: 12,
        color: COLORS.gray[300],
        marginHorizontal: 3,
    },
});
