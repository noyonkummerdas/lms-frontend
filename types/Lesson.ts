export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}
