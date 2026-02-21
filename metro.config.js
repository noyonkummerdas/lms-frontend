const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Note: withNativeWind() was removed because it triggers
// ERR_UNSUPPORTED_ESM_URL_SCHEME (protocol 'd:') on Windows when loading the config.
// To re-enable Tailwind/NativeWind on Windows, use a workaround or run from WSL.
module.exports = config;
