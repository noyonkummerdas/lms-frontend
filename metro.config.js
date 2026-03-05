const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix for react-i18next ESM resolution issue
config.resolver.sourceExts.push("mjs", "cjs");

// CRITICAL: Disable this if you see "Unable to resolve ./native-module/NativeAsyncStorage.js"
// or "Unable to resolve expo-device"
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./styles/global.css" });
