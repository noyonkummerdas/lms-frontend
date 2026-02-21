export const ROLES = {
  STUDENT: "student" as const,
  INSTRUCTOR: "instructor" as const,
  ADMIN: "admin" as const,
};

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.STUDENT]: [
    "view_courses",
    "enroll_course",
    "view_lessons",
    "submit_quiz",
    "submit_assignment",
    "view_profile",
  ],
  [ROLES.INSTRUCTOR]: [
    "create_course",
    "edit_course",
    "delete_course",
    "view_analytics",
    "grade_assignment",
    "view_students",
    "view_profile",
  ],
  [ROLES.ADMIN]: [
    "manage_users",
    "manage_courses",
    "manage_payments",
    "view_analytics",
    "manage_roles",
    "view_profile",
  ],
};
