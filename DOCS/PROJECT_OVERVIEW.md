# LMS Frontend - Project Overview

## 📋 Project Information

**Name**: LMS Frontend  
**Type**: React Native Mobile Application  
**Framework**: Expo + Expo Router  
**Styling**: NativeWind (Tailwind CSS for React Native)  
**State Management**: Redux Toolkit + RTK Query  
**Language**: TypeScript  
**Version**: 1.0.0  
**Last Updated**: February 2026  

---

## 🎯 Project Purpose

A complete, production-ready Learning Management System (LMS) frontend built with React Native, enabling students, instructors, and administrators to manage courses, lessons, quizzes, assignments, and certifications through a mobile-first experience.

---

## ✨ Key Features

✅ **Expo Router**  
- File-based routing similar to Next.js
- Built-in navigation stack management
- Type-safe route handling

✅ **Redux Toolkit + RTK Query**  
- Centralized state management
- Automatic API caching and synchronization
- DevTools integration

✅ **TypeScript**  
- Full type safety across the codebase
- Better developer experience with IDE support
- Type definitions for all API responses

✅ **NativeWind Styling**  
- Tailwind CSS utility classes in React Native
- Custom theme configuration
- Responsive design support

✅ **Custom Hooks**  
- useAuth: Authentication management
- useRole: Role-based access control
- useFetch: Generic data fetching

✅ **Component Library**  
- 10+ pre-built, reusable UI components
- Custom variants and sizes
- Built with NativeWind styling

✅ **API Integration**  
- RTK Query for server state management
- Automatic request/response transformation
- Error handling and retry logic

✅ **User Roles**  
- Student: Can view courses, submit quizzes, complete assignments
- Instructor: Can create courses, grade submissions
- Admin: Full system management

---

## 📁 Directory Structure

### Core Directories

#### `/app`  
Expo Router screens and layouts. Each `.tsx` file becomes a route.

```
app/
├── _layout.tsx          # Root layout (Redux Provider)
├── index.tsx            # Home/Landing page
├── dashboard.tsx        # Dashboard screen
├── profile.tsx          # User profile
├── courses/
│   ├── _layout.tsx      # Courses layout
│   └── index.tsx        # Courses list
├── auth/
│   ├── _layout.tsx      # Auth layout
│   └── login.tsx        # Login screen
└── ...other screens
```

**Routes Created**:
- `/` - Home/Landing
- `/dashboard` - Dashboard
- `/profile` - User Profile
- `/courses` - Courses List
- `/auth/login` - Login Screen

#### `/components`  
Reusable UI components with NativeWind styling.

| Component | Purpose | Props |
|-----------|---------|-------|
| `Button` | Action button | label, onPress, variant, size |
| `Input` | Text input field | placeholder, value, onChangeText |
| `Card` | Container component | children, className |
| `Navbar` | Top navigation | title, showMenu, onMenuPress |
| `Sidebar` | Side menu | isOpen, onClose, menuItems |
| `ProgressBar` | Progress indicator | progress, showLabel |
| `Dropdown` | Select component | options, value, onSelect |
| `QuizCard` | Quiz display | title, questionsCount, passingScore |
| `VideoPlayer` | Video container | title, videoUrl |
| `Table` | Data table | columns, rows |

#### `/store`  
Redux state management setup.

**Slices**:
- `authSlice` - Authentication state
- `userSlice` - User profile
- `courseSlice` - Courses
- `lessonSlice` - Lessons
- `quizSlice` - Quizzes
- `assignmentSlice` - Assignments
- `enrollmentSlice` - Enrollments
- `paymentSlice` - Payments
- `certificateSlice` - Certificates

**APIs** (RTK Query):
- `authApi` - Login, register, logout
- `userApi` - User operations
- `courseApi` - Course CRUD
- `lessonApi` - Lesson operations
- `quizApi` - Quiz operations
- `assignmentApi` - Assignment operations
- `enrollmentApi` - Enrollment operations
- `paymentApi` - Payment operations
- `certificateApi` - Certificate operations

#### `/types`  
TypeScript interfaces for all data models.

- `User.ts` - User interface
- `Course.ts` - Course interface
- `Lesson.ts` - Lesson interface
- `Quiz.ts` - Quiz interface
- `Assignment.ts` - Assignment interface
- `Enrollment.ts` - Enrollment interface
- `Payment.ts` - Payment interface
- `Certificate.ts` - Certificate interface

#### `/hooks`  
Custom React hooks.

- `useAuth()` - Get authentication state
- `useRole()` - Get user role and permissions
- `useFetch()` - Generic data fetching

#### `/utils`  
Helper and utility functions.

- `formatDate.ts` - Date formatting utilities
- `calcProgress.ts` - Progress calculations
- `validateForm.ts` - Form validation

#### `/constants`  
Application constants.

- `colors.ts` - Color palette (primary, secondary, etc.)
- `routes.ts` - Route definitions
- `roles.ts` - User roles and permissions

#### `/styles`  
Styling configuration.

- `global.css` - Tailwind CSS imports and global styles

---

## 🛠️ Configuration Files

### `babel.config.js`
Babel configuration for Expo + NativeWind + Router.

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["nativewind/babel", { input: "./styles/global.css" }],
      "expo-router/babel",
    ],
  };
};
```

### `tailwind.config.js`
Tailwind CSS configuration with custom theme.

```javascript
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#6366f1",
        // ... custom colors
      },
    },
  },
};
```

### `tsconfig.json`
TypeScript configuration.

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
```

### `app.json`
Expo app configuration (name, icon, version, etc.).

### `.env.local`
Environment variables (not in git).

```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_ENV=development
```

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

### 3. Start Development Server
```bash
npm start
```

### 4. Run on Device
- **Web**: `npm run start:web`
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Expo Go**: Scan QR code

---

## 📦 Dependencies

### Production
- **react**: UI library
- **react-native**: Mobile framework
- **expo**: Development platform
- **expo-router**: Navigation
- **@reduxjs/toolkit**: State management
- **react-redux**: Redux bindings
- **tailwindcss**: Styling
- **nativewind**: Tailwind for React Native

### Development
- **typescript**: Type safety
- **babel-preset-expo**: Babel preset
- **@types/react**: React types

---

## 🔐 Redux Store Architecture

### Store Setup
```tsx
// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
```

### Using Redux in Components
```tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  
  return <Text>{user?.name}</Text>;
}
```

---

## 🔗 API Integration

### RTK Query Usage
```tsx
import { useGetCoursesQuery } from "../store/api/courseApi";

export default function CoursesScreen() {
  const { data: courses, isLoading, error } = useGetCoursesQuery();
  
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading courses</Text>;
  
  return courses?.map(course => (
    <Text key={course.id}>{course.title}</Text>
  ));
}
```

### API Base URL
Configured via environment variable:
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🎨 Styling with NativeWind

### Button Example
```tsx
<View className="flex-1 bg-primary rounded-lg p-4">
  <Text className="text-white font-bold">Styled Text</Text>
</View>
```

### Theme Colors
- **primary**: `#1f2937` (dark gray)
- **secondary**: `#6366f1` (indigo)
- **success**: `#10b981` (green)
- **warning**: `#f59e0b` (amber)
- **danger**: `#ef4444` (red)

---

## 🔒 Authentication & Authorization

### Using useAuth Hook
```tsx
import { useAuth } from "../hooks";

export default function Component() {
  const { user, isAuthenticated, token } = useAuth();
  
  if (!isAuthenticated) {
    return <Text>Please log in</Text>;
  }
  
  return <Text>Welcome, {user?.name}</Text>;
}
```

### Using useRole Hook
```tsx
import { useRole } from "../hooks";

export default function Component() {
  const { role, isStudent, isInstructor, isAdmin } = useRole();
  
  if (!isAdmin) {
    return <Text>Admin access required</Text>;
  }
  
  return <Text>Admin Dashboard</Text>;
}
```

---

## 📊 Component Usage Examples

### Button Component
```tsx
<Button
  label="Click Me"
  onPress={() => console.log("clicked")}
  variant="primary"  // or secondary, danger, success
  size="md"         // or sm, lg
  disabled={false}
/>
```

### Input Component
```tsx
<Input
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

### Card Component
```tsx
<Card className="mb-4">
  <Text className="font-bold">Card Content</Text>
</Card>
```

### ProgressBar Component
```tsx
<ProgressBar
  progress={65}
  showLabel={true}
/>
```

---

## 🔄 Data Flow

```
User Interaction
      ↓
Component dispatches action
      ↓
Redux Slice updates state
      ↓
RTK Query fetches from API
      ↓
Response cached in Redux Store
      ↓
Component re-renders with new data
```

---

## 📱 Screen Hierarchy

```
Root Layout (_layout.tsx)
  ├── Home Screen (index.tsx)
  ├── Dashboard (dashboard.tsx)
  ├── Courses Layout
  │   └── Courses Screen
  ├── Auth Layout
  │   ├── Login Screen
  │   └── Register Screen
  ├── Profile Screen
  ├── Settings Screen
  └── ... Other Screens
```

---

## 🧪 Testing

### Component Testing
```tsx
// test.tsx
import { render, screen } from "@testing-library/react-native";

test("renders button", () => {
  render(<Button label="Click" onPress={() => {}} />);
  expect(screen.getByText("Click")).toBeTruthy();
});
```

---

## 🚢 Deployment

### Build for Production
```bash
# Android
eas build --platform android

# iOS
eas build --platform ios
```

### Environment Variables for Production
```
EXPO_PUBLIC_API_URL=https://api.production.com
EXPO_PUBLIC_ENV=production
```

---

## 📚 Technology Stack Summary

| Technology | Purpose | Version |
|-----------|---------|---------|
| React Native | UI Framework | 0.81.5 |
| Expo | Development Platform | ~54.0 |
| Expo Router | Navigation | ~6.0 |
| Redux Toolkit | State Management | ^1.9.7 |
| RTK Query | API Caching | Included |
| TypeScript | Type Safety | ~5.9.2 |
| NativeWind | Tailwind CSS | ^4.2.2 |
| Tailwind CSS | Utility CSS | ^3.4.19 |

---

## 🎓 Learning Resources

- [React Native Doc](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Guide](https://redux-toolkit.js.org/rtk-query/overview/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

MIT License - Free for personal and commercial use.

---

## 📞 Support

For help and support:
1. Check README.md
2. Review SETUP_GUIDE.md
3. Check official documentation
4. Open an issue on GitHub

---

**Created**: February 2026  
**Last Modified**: February 2026  
**Project Status**: ✅ Ready for Development
