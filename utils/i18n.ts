import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl-pluralrules';

import en from '../locales/en.json';
import bn from '../locales/bn.json';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetector = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lng: string) => void) => {
        try {
            const savedDataJSON = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
            const lng = savedDataJSON ? savedDataJSON : 'en';
            callback(lng);
        } catch (error) {
            console.log('Error reading language', error);
            callback('en');
        }
    },
    init: () => { },
    cacheUserLanguage: async (lng: string) => {
        try {
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng);
        } catch (error) {
            console.log('Error saving language', error);
        }
    },
};

const resources = {
    en: { translation: en },
    bn: { translation: bn },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4', // Required for React Native
        resources,
        fallbackLng: 'en',
        react: {
            useSuspense: false, // Prevents suspense issues in RN
        },
        interpolation: {
            escapeValue: false, // React already safeguards from XSS
        },
    });

export default i18n;
