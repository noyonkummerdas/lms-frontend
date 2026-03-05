import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true
    }),
});

/**
 * 100% Solve: Get Push Token & Register for Notifications
 * This is the standard "Golden Path" for Expo notifications.
 */
export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#6366f1',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        try {
            // "100% Solve" require project ID for SDK 50+
            const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.expoConfig?.slug;
            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
            console.log("[NotificationHelper] Push Token:", token);
        } catch (e) {
            console.warn("Failed to get Expo Push Token. If in Expo Go, push notifications are limited.", e);
        }
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}

export async function requestNotificationPermissions() {
    try {
        if (!Device.isDevice) {
            console.warn("Using Emulator - Local notifications will work, but Push might not.");
        }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus === 'granted';
    } catch (error) {
        console.warn("Notifications Check Error:", error);
        return false;
    }
}

/**
 * Schedule a local notification 15 minutes before a specific time of day
 * @param courseTitle Course name
 * @param days Array of days ["Sun", "Mon"...]
 * @param timeStr "HH:MM" 24h format
 */
export async function scheduleClassReminders(courseTitle: string, days: string[], timeStr: string) {
    const [hour, minute] = timeStr.split(':').map(Number);

    // Calculate Target Time (15 mins before)
    let targetHour = hour;
    let targetMinute = minute - 15;
    if (targetMinute < 0) {
        targetHour -= 1;
        targetMinute += 60;
    }
    if (targetHour < 0) targetHour += 24;

    const dayMap: Record<string, number> = {
        "Sun": 1, "Mon": 2, "Tue": 3, "Wed": 4, "Thu": 5, "Fri": 6, "Sat": 7
    };

    const dayIndices = days.map(d => dayMap[d]).filter(d => Boolean(d));

    for (const day of dayIndices) {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Reminder: Live Class Soon! 🎓`,
                    body: `Your "${courseTitle}" class will start in 15 minutes. Get ready!`,
                    data: { courseTitle, screen: 'Live' },
                },
                trigger: {
                    weekday: day,
                    hour: targetHour,
                    minute: targetMinute,
                    repeats: true,
                } as Notifications.NotificationTriggerInput,
            });
        } catch (e) {
            console.error(`Failed to schedule for day index ${day}`, e);
        }
    }

    console.log(`[NotificationHelper] Scheduled reminders for ${courseTitle} at ${targetHour}:${targetMinute} on ${days}`);
}
