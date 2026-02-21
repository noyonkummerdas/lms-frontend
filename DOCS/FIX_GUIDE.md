# LMS Frontend - Complete Setup & Troubleshooting Guide

## 📦 Step-by-Step Installation & Fix Procedure

### **Phase 1: Clean Environment**

```bash
# 1. Remove all node modules and lock files to start fresh
rm -r node_modules
rm package-lock.json

# 2. Clean Expo cache
npx expo prebuild --clean

# Clear watchman cache (if using watchman)
watchman watch-del-all 2>/dev/null || true
```

### **Phase 2: Install Dependencies**

```bash
# Install with exact versions for stability
npm install

# Verify react-native version matches Expo SDK
npm list react-native
npm list expo
```

**Expected Output:**
```
expo@54.0.33
react-native@0.73.6
react@18.2.0
```

---

## 🔧 Configuration Files Summary

### **1. package.json**
**Changes Applied:**
- Updated `@types/react` from 18.3.1 → 18.2.0 (matches react version)
- Added `@types/react-native@^0.73.0` (TypeScript support for RN)
- Added `@types/node@^20.0.0` (Node type definitions)
- Updated Node engine requirement to `>=18.0.0`
- Added build scripts: `build:android`, `build:ios`

**Why:** Version mismatches cause TypeScript errors and type conflicts. Native types are essential for proper IntelliSense.

---

### **2. metro.config.js** (NEW FILE - CRITICAL)
**Content:**
```javascript
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierPath: "metro-minify-terser",
};

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "cjs"],
  blacklistRE: /node_modules\/(react-native-gesture-handler|@react-native\/codegen|react-native\/src\/private)/,
};

module.exports = config;
```

**Why:** This file tells Metro (React Native's bundler) to NOT transform React Native's internal source files. The `blacklistRE` regex ensures bundler doesn't run Babel's codegen plugin on RN library internals, which was causing the `VirtualViewNativeComponent` error.

---

### **3. babel.config.js** (SIMPLIFIED)
**Changes Applied:**
- Removed `ignore` patterns (these don't work reliably in Babel)
- Let Metro's `metro.config.js` handle exclusions instead

**Original Problem Code:**
```javascript
ignore: [
  /node_modules\/react-native\/src\/.*/,
  /node_modules\/@react-native\/codegen\/.*/
]
```

**Why:** Babel's ignore patterns are unreliable across versions. Metro's blacklist is the proper layer to handle this.

---

### **4. tsconfig.json** (ENHANCED)
**Changes Applied:**
- Added `"jsx": "react-native"` - explicit JSX transformation
- Added `"isolatedModules": true` - better error detection
- Added `"skipLibCheck": true` - faster compilation
- Added `"esModuleInterop": true` - compatibility with CommonJS modules
- Added `"allowSyntheticDefaultImports": true` - better import support
- Added `"forceConsistentCasingInFileNames": true` - consistent file naming
- Added `"resolveJsonModule": true` - allow JSON imports
- Added `"moduleResolution": "node"` - proper module resolution
- Added `"lib": ["es2020", "dom"]` - ES2020 features + DOM APIs

**Why:** These compiler options enable proper TypeScript checking, catch more errors at build time, and improve compatibility with Expo tooling.

---

### **5. tailwind.config.js** (MINOR UPDATE)
**Changes Applied:**
- Added `"./pages/**/*.{ts,tsx}"` to content patterns
- This ensures Tailwind parses all component files for class names

**Why:** NativeWind reads classes from all files. Missing paths mean classes won't be processed.

---

## 🔨 Source Code Fixes

### **Fix #1: Entry Point Architecture** 
**File:** `index.ts`

**Before:**
```typescript
import App from './App';
registerRootComponent(App);
```

**After:**
```typescript
import RootLayout from './app/_layout';
registerRootComponent(RootLayout);
```

**Why:** Expo Router projects should use file-based routing via `app/_layout.tsx`, not traditional App.tsx. This was causing duplicate navigation hierarchies.

---

### **Fix #2: Component Button Implementation**
**File:** `components/Button.tsx`

**Before:**
```tsx
import { View, ViewStyle } from "react-native";
<View onTouchStart={!disabled ? onPress : undefined} ... >
```

**After:**
```tsx
import { Pressable, ViewStyle } from "react-native";
<Pressable onPress={onPress} disabled={disabled} ... >
```

**Why:** 
- `Pressable` is the proper RN component for touch handling (supports on/off state, feedback)
- `View` with `onTouchStart` is incorrect - `onTouchStart` only fires on touch down, not up/press
- `Pressable` has built-in `disabled` prop support

---

### **Fix #3: Import Path Corrections**
**File:** `app/auth/login.tsx` (and all files under `app/`)

**Before:**
```tsx
import { Button } from "../components";           // WRONG - goes up 1 level
import { AppDispatch } from "../store/store";     // WRONG
```

**After:**
```tsx
import { Button } from "../../components";        // Correct - goes up 2 levels
import { AppDispatch } from "../../store/store";  // Correct
```

**Why:** File structure:
```
app/
  auth/
    login.tsx    ← You are here
../../components/ ← 2 levels up
../../store/     ← 2 levels up
```

**Required Changes in:**
- `app/auth/login.tsx`
- `app/courses/index.tsx`
- `app/dashboard.tsx`
- `app/profile.tsx`
- Any other pages in `app/*/`

---

## 🚀 Clean Installation & Run Commands

```bash
# 1. Clean everything
rm -rf node_modules package-lock.json .expo dist

# 2. Fresh install
npm install

# 3. Clear Expo cache completely
npx expo start --clear

# 4. For Android (with emulator running)
npx expo run:android

# 5. For iOS (macOS only)
npx expo run:ios

# 6. For Web
npx expo start --web

# 7. For Expo Go (QR code scan on device)
npx expo start
```

---

## ✅ Verification Checklist

After applying all fixes, verify:

- [ ] `npm install` completes without errors
- [ ] No peer dependency warnings
- [ ] `tsc --noEmit` shows no TypeScript errors
- [ ] `npx expo start -c` runs without bundling errors
- [ ] No "VirtualViewNativeComponent" errors in Metro
- [ ] No "Could not find component config" errors
- [ ] Button component accepts `onPress` and works properly
- [ ] All pages import components and store correctly
- [ ] App loads in Expo Go without crashes
- [ ] Android/iOS emulator starts the app
- [ ] Web version loads (if applicable)

---

## 🐛 Troubleshooting

### **Error: "Could not find component config for native component"**
- **Root Cause:** Babel trying to parse React Native source files
- **Solution:** Ensure `metro.config.js` exists with proper `blacklistRE` pattern
- **New Fix:** Already applied in metro.config.js

### **Error: "Cannot find module '../components'"**
- **Root Cause:** Wrong import paths in app/ pages
- **Solution:** Use `../../` for relative paths from app/auth/ or app/courses/
- **New Fix:** Update all import paths in app/ directory

### **Error: "Module 'react' not found"**
- **Root Cause:** Dependencies not installed
- **Solution:** Run `npm install` and verify node_modules exists
- **Verify:** `ls node_modules | grep react`

### **Error: "VirtualViewNativeComponent bundling fails"**
- **Root Cause:** Metro transforming React Native's src directly
- **Solution:** metro.config.js blacklist working
- **Verify:** `npm list react-native` shows 0.73.6

### **TypeScript: "Type 'X' not assignable to type 'Y'"**
- **Root Cause:** Version mismatches between react and @types/react
- **Solution:** Ensure versions match (18.2.0 for both)
- **Verify:** `grep -A1 '"react"' package.json`

### **Port Already in Use (8081)**
- **Solution:** Kill the process or use a different port
```bash
# Kill process on port 8081 (macOS/Linux)
lsof -ti:8081 | xargs kill -9

# Or use different port
npx expo start --port 8082
```

---

## 📝 Environment Variables

Create `.env.local` (copy from `.env.example`):
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_ENV=development
```

**Note:** Only variables prefixed with `EXPO_PUBLIC_` are accessible in Expo projects for security.

---

## 📚 Additional Resources

- [Expo Router Docs](https://docs.expo.dev/routing/introduction/)
- [React Native 0.73 Release Notes](https://reactnative.dev/blog/2024/01/15/react-native-0.73-release)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Metro Configuration](https://facebook.github.io/metro/docs/configuration/)
- [TypeScript with React Native](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

## 🎯 Why Each Fix is Essential

| Fix | Why | Impact |
|-----|-----|--------|
| metro.config.js | Prevent Metro from transforming RN source | Eliminates codegen crash |
| babel.config.js cleanup | Remove unreliable Babel patterns | Let Metro handle exclusions |
| tsconfig.json | Enable proper TypeScript checking | Catch errors earlier |
| package.json updates | Match Expo SDK 54 compatibility | Prevent runtime errors |
| Import path fixes | Navigate correct file structure | Bundle correctly |
| Button → Pressable | Use proper RN touch component | Better UX, touch feedback |
| index.ts → RootLayout | Single navigation architecture | No duplicate root components |

