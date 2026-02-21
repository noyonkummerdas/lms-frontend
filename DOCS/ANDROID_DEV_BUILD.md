# Running on Android (fix for PlatformConstants / Bridgeless error)

## The error

If you see:

```text
Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found.
Bridgeless mode: true.
```

it usually means the app is running in **Expo Go**, which uses the New Architecture (Bridgeless mode). This project is set to **`newArchEnabled: false`**, so it expects the classic bridge and native modules like `PlatformConstants`. In Expo Go you don’t control the native binary, so you can hit this mismatch.

## Fix: use a development build instead of Expo Go

Run the app as a **native Android build** (no Expo Go). That build will respect `newArchEnabled: false` and the error goes away.

### Prerequisites

- **Android Studio** installed with Android SDK
- **USB debugging** enabled on your device (or use an emulator)
- Device/emulator on the same network as your machine if you use “tunnel” later

### Steps

1. **From the project root:**

   ```bash
   npx expo run:android
   ```

   This will:

   - Run prebuild if needed (generate `android/` from `app.json`)
   - Build the native app with **old architecture** (`newArchEnabled: false`)
   - Install and run the app on the connected device/emulator

2. **Start the dev server** (if it’s not already running):

   ```bash
   npx expo start -c
   ```

   Then in the terminal you can press **`a`** to open on Android again, or run `npx expo run:android` in another terminal.

After this, the app runs in a **development build** (your own native binary), not in Expo Go, so `PlatformConstants` and the rest of the bridge are available and the error should be resolved.

## Optional: keep using Expo Go

To use Expo Go you must use a version that matches your **Expo SDK** and supports the same architecture. Even then, Expo Go may enforce New Architecture, so if the error persists, use the development build above.
