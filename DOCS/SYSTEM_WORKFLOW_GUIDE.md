# TechSoul LMS - Comprehensive System Workflow Guide

This document provides a detailed operational description of how the TechSoul LMS platform functions, covering the end-to-end journey for Students, Instructors, and Administrators.

---

## 1. System Overview
TechSoul LMS is a role-based educational ecosystem. The application logic is divided into three distinct experiences based on user permissions: **Student**, **Instructor**, and **Admin**.

---

## 2. The Student Journey (Learning Loop)

### Step 1: Authentication & Onboarding
*   Users register or log in via the Auth screen.
*   The system assigns the `student` role by default unless specified otherwise.
*   The **Student Dashboard** serves as the central hub, showing enrolled courses and overall progress.

### Step 2: Course Discovery & Enrollment
*   **Explore Screen**: Students browse high-quality course cards with real images, filtered by categories (e.g., Development, Design).
*   **Course Details**: Selecting a course shows the syllabus (Modules & Lessons), instructor info, and pricing.
*   **Checkout**: Students can enroll in Free courses instantly or proceed through a payment flow for premium content.

### Step 3: Immersive Learning
*   **Module-wise Learning**: Courses are organized into logical Modules (e.g., Module 1: Basics).
*   **Interactive Player**: 
    *   Lessons must be watched to completion.
    *   The **"Complete Lesson"** button unlocks only after a specific percentage of the video is watched.
    *   Next lessons are automatically selected upon completion, even across module boundaries.

### Step 4: Assessment & Results
*   **Quizzes**: After finishing all lessons in a module/course, students take timed quizzes.
*   **Assignments**: Practical tasks are submitted directly through the platform.
*   **Certification**: Once 100% progress is achieved and assessments are passed, a dynamic certificate is generated.

---

## 3. The Instructor Journey (Content Creation)

### Step 1: Instructor Dashboard
*   Instructors see a high-level view of their **Total Students**, **Active Courses**, and **Monthly Earnings**.

### Step 2: Course Management
*   **Creation**: Instructors can build courses by adding titles, descriptions, images, and pricing.
*   **Syllabus Building**: Instructors organize content into **Modules** and upload **Lessons** (Video URLs/Titles).

### Step 3: Student & Grading Management
*   Instructors can view a list of students enrolled in their courses.
*   They review assignment submissions and provide feedback or grades.

---

## 4. The Admin Journey (Platform Oversight)

### Step 1: Operational Control (Approval System)
*   **Course Approval**: New courses created by instructors enter a "Pending" state. Admins review and approve them before they appear on the Explore screen.

### Step 2: User & Platform Management
*   Admins can view and manage all platform users.
*   They have the authority to **Suspend** or **Ban** users who violate policies, with visual indicators (e.g., "Inactive" badges).

### Step 3: Data Analytics & Reporting
*   **Global Reports**: Admins access deep analytics on platform revenue, user growth, and instructor performance.
*   **Filtering**: Data can be filtered by time ranges (Weekly, Monthly, Yearly) to track business growth.

---

## 5. Core Technical Mechanisms

### A. Role-Based Access Control (RBAC)
*   The application uses a `role` property in the user state to conditionally render navigation bars (`Navbar`, `InstructorNavbar`, `AdminNavbar`) and restrict access to specific folders in the `app/` directory.

### B. Progress Calculation
*   Progress is calculated based on the ratio of `completedLessons` to `totalLessons`.
*   Unlocking logic ensures that a student follows the curriculum sequentially (Module 1 -> Module 2).

### C. State Persistence
*   The application utilizes **Redux Toolkit** to maintain the user's session, course data, and progress across different screens without re-fetching.

---

**Document Version**: 1.0.0  
**Last Updated**: February 23, 2026  
**Project**: TechSoul LMS Frontend
