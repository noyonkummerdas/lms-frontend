export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: "active" | "completed" | "dropped";
  progress: number;
  enrolledAt: string;
  completedAt?: string;
}
