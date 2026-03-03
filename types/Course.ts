export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string | { _id: string; name: string; avatar?: string };
  thumbnail?: string;
  category: string | { _id: string; name: string };
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: number;
  level: "beginner" | "intermediate" | "advanced";
  status: "draft" | "pending" | "published";
  createdAt: string;
  updatedAt: string;
}
