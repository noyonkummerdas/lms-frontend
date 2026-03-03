const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix for react-i18next ESM resolution issue
config.resolver.sourceExts.push("mjs", "cjs");
config.resolver.unstable_enablePackageExports = true;

module.exports = withNativeWind(config, { input: "./styles/global.css" });
