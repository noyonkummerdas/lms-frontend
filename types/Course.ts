export interface Course {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  instructor?: string | { _id: string; name: string; avatar?: string };
  thumbnail?: string;
  introVideo?: string;
  finalAssignment?: string;
  sections?: any[];
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
