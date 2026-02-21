# FOLDER_STRUCTURE.md

## Complete Project Folder Structure

```
lms-frontend/
│
├── app/                                    # 📱 Expo Router screens & layouts
│   ├── _layout.tsx                        # Root layout (Redux Provider)
│   ├── index.tsx                          # Home/Landing page
│   ├── dashboard.tsx                      # Dashboard (after login)
│   ├── profile.tsx                        # User profile page
│   │
│   ├── auth/                              # Authentication routes
│   │   ├── _layout.tsx                    # Auth layout wrapper
│   │   ├── login.tsx                      # Login screen (EXAMPLE)
│   │   └── register.tsx                   # Register screen (TEMPLATE)
│   │
│   ├── courses/                           # Course routes
│   │   ├── _layout.tsx                    # Courses layout
│   │   ├── index.tsx                      # Courses list (EXAMPLE)
│   │   └── [id].tsx                       # Course details (TEMPLATE)
│   │
│   └── ...other screen files              # Add more routes as needed
│
├── components/                             # 🎨 Reusable UI components
│   ├── Button.tsx                         # Customizable button
│   ├── Input.tsx                          # Text input field
│   ├── Card.tsx                           # Container component
│   ├── Navbar.tsx                         # Top navigation bar
│   ├── Sidebar.tsx                        # Side navigation menu
│   ├── ProgressBar.tsx                    # Progress indicator
│   ├── Dropdown.tsx                       # Select dropdown
│   ├── QuizCard.tsx                       # Quiz display card
│   ├── VideoPlayer.tsx                    # Video player container
│   ├── Table.tsx                          # Data table
│   └── index.ts                           # Components export barrel
│
├── store/                                  # 🔴 Redux store setup
│   │
│   ├── store.ts                           # Redux store configuration
│   │
│   ├── slices/                            # Redux slices (actions + reducers)
│   │   ├── authSlice.ts                   # Authentication state
│   │   ├── userSlice.ts                   # User profile state
│   │   ├── courseSlice.ts                 # Courses state
│   │   ├── lessonSlice.ts                 # Lessons state
│   │   ├── quizSlice.ts                   # Quizzes state
│   │   ├── assignmentSlice.ts             # Assignments state
│   │   ├── enrollmentSlice.ts             # Enrollments state
│   │   ├── paymentSlice.ts                # Payments state
│   │   └── certificateSlice.ts            # Certificates state
│   │
│   └── api/                               # RTK Query APIs
│       ├── authApi.ts                     # Auth endpoints
│       ├── userApi.ts                     # User endpoints
│       ├── courseApi.ts                   # Course endpoints
│       ├── lessonApi.ts                   # Lesson endpoints
│       ├── quizApi.ts                     # Quiz endpoints
│       ├── assignmentApi.ts               # Assignment endpoints
│       ├── enrollmentApi.ts               # Enrollment endpoints
│       ├── paymentApi.ts                  # Payment endpoints
│       └── certificateApi.ts              # Certificate endpoints
│
├── types/                                  # 📝 TypeScript interfaces
│   ├── User.ts                            # User interface
│   ├── Course.ts                          # Course interface
│   ├── Lesson.ts                          # Lesson interface
│   ├── Quiz.ts                            # Quiz interface
│   ├── Assignment.ts                      # Assignment interface
│   ├── Enrollment.ts                      # Enrollment interface
│   ├── Payment.ts                         # Payment interface
│   └── Certificate.ts                     # Certificate interface
│
├── hooks/                                  # 🎣 Custom React hooks
│   ├── useAuth.ts                         # Authentication hook
│   ├── useRole.ts                         # Role-based access hook
│   ├── useFetch.ts                        # Generic data fetching
│   └── index.ts                           # Hooks export barrel
│
├── utils/                                  # 🔧 Helper utilities
│   ├── formatDate.ts                      # Date formatting helpers
│   ├── calcProgress.ts                    # Progress calculations
│   ├── validateForm.ts                    # Form validation utilities
│   └── index.ts                           # Utils export barrel
│
├── constants/                              # ⚙️ App constants
│   ├── colors.ts                          # Color palette
│   ├── routes.ts                          # Route definitions
│   ├── roles.ts                           # User roles & permissions
│   └── index.ts                           # Constants export barrel
│
├── assets/                                 # 🎯 Static files
│   ├── images/                            # Image files (PNG, JPG, etc.)
│   ├── icons/                             # Icon files
│   └── fonts/                             # Custom fonts
│       └── SpaceMono-Regular.ttf          # Example font file
│
├── styles/                                 # 🎨 Styling
│   └── global.css                         # Global Tailwind CSS imports
│
├── public/                                 # (Optional) Public assets
│   └── (static files served)
│
├── hooks.ts                               # (Optional) Additional hooks
├── App.tsx                                # (Optional) Legacy fallback
│
├── 📄 Configuration Files
├── app.json                               # Expo app configuration
├── babel.config.js                        # Babel configuration
├── tailwind.config.js                     # Tailwind CSS config
├── tsconfig.json                          # TypeScript config
├── package.json                           # Dependencies & scripts
├── package-lock.json                      # Lock file (auto-generated)
├── expo-env.d.ts                          # Expo type definitions
├── nativewind-env.d.ts                    # NativeWind type definitions
│
├── 📚 Documentation Files
├── README.md                              # Project README
├── SETUP_GUIDE.md                         # Detailed setup instructions
├── PROJECT_OVERVIEW.md                    # Project overview & features
├── FOLDER_STRUCTURE.md                    # This file
│
├── 🔐 Configuration & Secrets
├── .env.example                           # Environment variables template
├── .env.local                             # Local env vars (NOT in git)
├── .gitignore                             # Git ignore rules
│
└── 🎮 Other Files
    ├── .npmrc                             # NPM configuration (optional)
    ├── .eslintrc.json                     # ESLint config (optional)
    ├── jest.config.js                     # Jest config (optional)
    └── ... (other config files)
```

## File Count & Organization

```
Total Directories:    20+
Total TypeScript Files: 50+
Total Config Files:    8
Total Documentation:   4
```

## Key Directories Explained

### `/app` - Expo Router
- File-based routing system
- Each `.tsx` file becomes a route
- `_layout.tsx` files are layout wrappers
- Nested folders create nested routes

### `/components` - Reusable UI
- Pre-built, styled components
- All use NativeWind/Tailwind classes
- Fully typed with TypeScript
- Ready to use, easy to customize

### `/store` - Redux
- Centralized state management
- Slices for different domains
- RTK Query for API calls
- Automatic caching & synchronization

### `/types` - Type Definitions
- Interfaces for all data models
- Used throughout the app
- Ensures type safety
- Single source of truth

### `/hooks` - Custom Hooks
- Reusable React hook logic
- Encapsulate common patterns
- Easy to share across components
- Pre-built auth & role hooks

### `/utils` - Helper Functions
- Date formatting
- Progress calculations
- Form validation
- Reusable logic

### `/constants` - App-wide Constants
- Color palette
- Route definitions
- User roles & permissions
- Configuration values

### `/assets` - Static Files
- Images (PNG, JPG, GIF, etc.)
- Icons and illustrations
- Custom fonts
- Media files

### `/styles` - Styling
- Global Tailwind CSS setup
- Theme customization
- Utility classes definition

## File Naming Conventions

### TypeScript Files
- **Components**: `PascalCase.tsx` (e.g., `Button.tsx`)
- **Screens**: `camelCase.tsx` (e.g., `courseDetails.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useAuth.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Types**: `PascalCase.ts` (e.g., `User.ts`)
- **Slices**: `camelCase.ts` (e.g., `authSlice.ts`)
- **APIs**: `camelCase.ts` (e.g., `authApi.ts`)

### Configuration Files
- `babel.config.js`
- `tailwind.config.js`
- `tsconfig.json`
- `.env.local` (local only)
- `.env.example` (template)

## Directory Hierarchy

```
lms-frontend/
├── app/                     Layer 1: Screens & Routes
├── components/              Layer 2: UI Components
├── store/                   Layer 3: State Management
│   ├── slices/
│   └── api/
├── types/                   Layer 4: Type Definitions
├── hooks/                   Layer 5: Custom Hooks
├── utils/                   Layer 6: Utilities
├── constants/               Layer 7: Constants
├── assets/                  Layer 8: Static Assets
├── styles/                  Layer 9: Styling
└── Config & Docs           Layer 10: Configuration
```

## How to Add New Features

### Adding a New Screen
1. Create file: `app/featureName.tsx` or `app/featureName/index.tsx`
2. Import components and hooks
3. Style with Tailwind classes
4. Access route: `/featureName`

### Adding a New Component
1. Create file: `components/ComponentName.tsx`
2. Export as default
3. Add to `components/index.ts`
4. Import and use in screens

### Adding Redux State
1. Create `store/slices/featureSlice.ts`
2. Define initial state and reducers
3. Export in `store/store.ts`
4. Use `useSelector` and `useDispatch` in components

### Adding API Integration
1. Create `store/api/featureApi.ts`
2. Define RTK Query endpoints
3. Export hooks
4. Use `useGetFeatureQuery()` in components

### Adding Custom Hook
1. Create `hooks/useFeature.ts`
2. Export from `hooks/index.ts`
3. Use in components

## Best Practices

✅ Keep components small and focused  
✅ Use hooks for shared logic  
✅ Type everything with TypeScript  
✅ Follow naming conventions  
✅ Keep utils pure and testable  
✅ Use Redux for global state only  
✅ Use local state for component state  
✅ Keep APIs separate from business logic  

---

**Last Updated**: February 2026  
**Version**: 1.0.0
