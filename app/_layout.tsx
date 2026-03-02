import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions, Image, Text, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/global.css";

const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        console.log("[Splash] Bootstrapping...");
        // Wait 3 seconds to ensure user sees the logo
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        console.log("[Splash] Ready.");
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log("[Splash] Hiding native splash layer.");
      await SplashScreen.hideAsync().catch(() => { });

      // Reveal the App, then fade out the custom overlay
      setTimeout(() => {
        console.log("[Splash] Starting JS fade-out.");
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.4,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          console.log("[Splash] Animation finished.");
          setAnimationFinished(true);
        });
      }, 500);
    }
  }, [appIsReady, fadeAnim, scaleAnim]);

  if (!appIsReady && !animationFinished) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: "#ffffff" }} onLayout={onLayoutRootView}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff" },
          }}
        />

        {/* custom Splash Screen Overlay */}
        {!animationFinished && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "#ffffff",
                opacity: fadeAnim,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999999,
              }
            ]}
          >
            <View style={{ alignItems: 'center' }}>
              <Animated.Image
                source={require("../assets/splash-icon.png")}
                style={{
                  width: width * 0.75,
                  height: width * 0.5,
                  resizeMode: "contain",
                  transform: [{ scale: scaleAnim }],
                }}
              />
              <Text style={{ marginTop: 24, fontSize: 24, fontStyle: 'italic', color: '#1e293b', fontWeight: '900', letterSpacing: 1 }}>
                LMS PLATFORM
              </Text>
              <Text style={{ marginTop: 8, fontSize: 14, color: '#94a3b8', fontWeight: '600' }}>
                Powered by Techsoul
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </Provider>
  );
}
