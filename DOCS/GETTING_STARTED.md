# 🚀 GETTING_STARTED.md

## Welcome to LMS Frontend!

This is a complete, production-ready Learning Management System frontend built with React Native, Expo, TypeScript, and NativeWind.

---

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your backend API URL:
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 3: Start Development Server
```bash
npm start
```

### Step 4: Run on Your Device
- **Web**: Press `w` in terminal
- **Android**: Press `a` in terminal  
- **iOS**: Press `i` in terminal
- **Expo Go**: Scan QR code with Expo Go app

✅ **That's it! Your app should now be running.**

---

## 📚 Next Steps

### Explore the Project
1. Review `README.md` for overview
2. Check `PROJECT_OVERVIEW.md` for detailed info
3. See `FOLDER_STRUCTURE.md` for file organization
4. Read `SETUP_GUIDE.md` for comprehensive setup

### Understand the Architecture
- **Screens**: Located in `/app` folder
- **Components**: Located in `/components` folder
- **State**: Managed with Redux in `/store` folder
- **API**: RTK Query in `/store/api` folder
- **Types**: Defined in `/types` folder

### Start Building
1. Create new screens in `/app`
2. Use components from `/components`
3. Dispatch actions using Redux
4. Fetch data with RTK Query
5. Style with Tailwind CSS classes

---

## 🎯 Project Highlights

### Pre-built Components
✅ Button - Customizable button with variants  
✅ Input - Text input with validation  
✅ Card - Container component  
✅ Navbar - Top navigation  
✅ Sidebar - Side menu  
✅ ProgressBar - Progress indicator  
✅ Dropdown - Select component  
✅ Table - Data table  
✅ QuizCard - Quiz display  
✅ VideoPlayer - Video container  

### Example Screens
✅ Home/Landing Screen  
✅ Login Screen  
✅ Dashboard Screen  
✅ Courses List Screen  
✅ Profile Screen  

### Redux Setup
✅ 9 Redux slices for different domains  
✅ 9 RTK Query APIs ready to use  
✅ Redux DevTools integration  
✅ Type-safe state management  

### Custom Hooks
✅ useAuth() - Authentication  
✅ useRole() - Role-based access  
✅ useFetch() - Data fetching  

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and features |
| `SETUP_GUIDE.md` | Detailed installation & configuration |
| `PROJECT_OVERVIEW.md` | Architecture and technical details |
| `FOLDER_STRUCTURE.md` | Directory organization |
| `GETTING_STARTED.md` | This file! Quick start guide |

---

## 🔧 Common Commands

```bash
# Start development
npm start

# Web browser
npm run start:web

# Android emulator
npm run android

# iOS simulator (macOS only)
npm run ios

# Type check
npm run type-check

# Lint code
npm run lint

# Clear cache
expo start -c
```

---

## 📱 Available Screens

### Home/Landing
- Path: `/`
- Shows welcome message and quick links

### Login
- Path: `/auth/login`
- Example auth screen with form validation
- Uses Redux and RTK Query

### Dashboard
- Path: `/dashboard`
- Shows user stats and progress
- Protected route (requires login)

### Courses
- Path: `/courses`
- Lists all available courses
- Shows course progress

### Profile
- Path: `/profile`
- User profile information
- Shows statistics and certificates

---

## 🆕 Creating Your First Screen

### 1. Create Screen File
Create `app/myfeature.tsx`:

```tsx
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar } from "../components";

export default function MyFeatureScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Navbar title="My Feature" />
      <View className="p-4">
        <Text className="text-2xl font-bold text-primary">
          Welcome to My Feature
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

### 2. Access the Screen
Navigate to: `/myfeature`

### 3. Add Navigation Link
```tsx
import { useRouter } from "expo-router";

<TouchableOpacity onPress={() => router.push("/myfeature")}>
  <Text>Go to My Feature</Text>
</TouchableOpacity>
```

---

## 🎨 Styling with Tailwind

### Common Classes
```tsx
// Layout
className="flex-1 justify-center items-center"
className="flex-row gap-2"

// Spacing
className="p-4 m-2"
className="px-4 py-3"

// Colors
className="bg-primary text-white"
className="text-secondary font-bold"

// Sizing
className="w-full h-20"
className="rounded-lg shadow-md"

// Text
className="text-lg font-semibold text-center"
className="text-xs text-gray-600"
```

---

## 🔐 Using Redux

### Dispatching Actions
```tsx
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

const dispatch = useDispatch();
dispatch(setUser(userData));
```

### Reading State
```tsx
import { useSelector } from "react-redux";

const user = useSelector(state => state.auth.user);
```

### Using RTK Query
```tsx
import { useGetCoursesQuery } from "../store/api/courseApi";

const { data: courses, isLoading } = useGetCoursesQuery();
```

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
expo start -c
```

### Styles Not Applying
- Verify import in `app/_layout.tsx`: `import "../styles/global.css"`
- Restart server: `expo start -c`

### Module Not Found
- Check file paths in imports
- Verify file extensions (.ts, .tsx)
- Clear cache: `npm install`

### Redux Issues
- Check store.ts for middleware setup
- Verify Provider in `app/_layout.tsx`
- Use Redux DevTools to debug

---

## 📚 Learning Resources

- 📘 [React Native Docs](https://reactnative.dev/)
- 📗 [Expo Documentation](https://docs.expo.dev/)
- 📙 [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- 📕 [NativeWind Docs](https://www.nativewind.dev/)
- 📔 [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🎓 Project Structure at a Glance

```
src/
├── app/              ← Your screens go here
├── components/       ← Reusable UI components
├── store/            ← Redux state & APIs
├── types/            ← TypeScript interfaces
├── hooks/            ← Custom React hooks
├── utils/            ← Helper functions
├── constants/        ← App constants
└── styles/           ← Tailwind CSS
```

---

## ✅ Checklist

- [ ] Run `npm install`
- [ ] Create `.env.local` and add API URL
- [ ] Run `npm start`
- [ ] Scan QR code with Expo Go
- [ ] See home screen in your device
- [ ] Review example screens
- [ ] Understand Redux setup
- [ ] Create your first screen
- [ ] Connect to your backend API
- [ ] Deploy to production

---

## 🆘 Need Help?

1. **Quick answers**: Check README.md
2. **Setup issues**: See SETUP_GUIDE.md
3. **Architecture questions**: Read PROJECT_OVERVIEW.md
4. **File structure**: Review FOLDER_STRUCTURE.md
5. **Official docs**: Visit documentation links above

---

## 🎉 You're Ready!

Your LMS Frontend is ready to use. Happy coding! 🚀

Start by creating your first screen or connecting to your backend API.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: ✅ Production Ready
