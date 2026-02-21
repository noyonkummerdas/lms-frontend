export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number;
  createdAt: string;
  updatedAt: string;
}
