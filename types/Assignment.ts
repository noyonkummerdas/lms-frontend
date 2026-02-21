export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}
