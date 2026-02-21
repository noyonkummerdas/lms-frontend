export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail?: string;
  category: string;
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  updatedAt: string;
}
