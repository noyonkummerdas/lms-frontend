# TechSoul LMS Platform - System Documentation

## 🏆 Project Overview
TechSoul LMS is a premium, full-featured Learning Management System designed for high-end educational experiences. The platform utilizes a three-tier role system: **Student, Instructor, and Admin**, each with specialized dashboards and workflows.

---

## 👥 Role Workflows & Features

### 1. Student Experience (The Learner)
*   **Discovery & Enrollment**: 
    *   **Premium Explore**: Multi-category filtering (Dev, Design, Business, etc.) with real-time search.
    *   **Wishlist System**: Save courses for later with a single tap.
*   **The Learning Path**:
    *   **Locked Progress Video Player**: Students cannot skip forward in uncompleted lessons.
    *   **Dynamic Completion Button**: Visual feedback changes based on watch time (Black < 65% → Orange < 100% → Secondary Brand Color).
*   **Assessment & Certification**:
    *   **Sequential Unlocking**: Videos → Quiz → Assignment → Certificate.
    *   **Quiz Engine**: Timed quizzes with score tracking (70% pass requirement).
    *   **Assignment Center**: Practical task submission portal.
    *   **Certification**: Automated high-fidelity certificate generation upon completion.

### 2. Instructor Experience (The Creator)
*   **Content Management**:
    *   Dedicated dashboard for course creation and editing.
    *   Lesson-by-lesson content upload and resource management.
*   **Analytics**:
    *   Personal earnings tracker and student enrollment numbers.
    *   Task review portal for grading student assignments.

### 3. Admin Experience (The Controller)
*   **Operational Oversight**:
    *   **Course Approval Queue**: Review pending courses and activate them for the marketplace.
    *   **User Management**: Global control over all users. Feature to **Suspend/Ban** users with visual "Inactive" indicators.
*   **Premium Analytics Hub**:
    *   Data-rich reports on Revenue, Engagement, and Growth.
    *   Instructor leaderboards and conversion rate tracking.
    *   Interactive time-range filtering (Day/Week/Month/Year).

---

## 🎨 UI/UX Design System
*   **Design Philosophy**: Modern, clean, and data-dense. Uses "Glassmorphism" concepts and soft shadows.
*   **Color Palette**:
    *   `Primary`: Deep charcoal for professional stability.
    *   `Secondary`: Vibrant blue for primary actions.
    *   `Success`: Emerald green for completion and growth.
    *   `Danger/Warning`: Crimson and sunset orange for urgency/locks.
*   **Typography**: Bold, high-contrast headings with medium-weight supporting text for readability.

---

## 🛠️ Technical Stack
*   **Core**: React Native (Expo)
*   **Navigation**: Expo Router (File-based routing)
*   **State Management**: React Hooks (useState, useMemo, useEffect)
*   **Styling**: StyleSheet (Vanilla CSS approach for flexibility)
*   **Icons**: Ionicons (Vector icons)
*   **Utility**: Expo Screen Orientation for immersive video learning.

---

## 🚀 Upcoming Roadmap
1.  **Backend Integration**: Connecting current front-end mock states to persistent REST/GraphQL APIs.
2.  **Real Video Streaming**: Migrating from placeholders to HLS/MP4 streaming via `expo-av`.
3.  **Payment Processing**: Integration of Stripe/PayPal for course purchases.
4.  **Live Classes**: Real-time Zoom/WebRTC integration for the "Live" tab functionality.

---
*Last Updated: February 23, 2026*
