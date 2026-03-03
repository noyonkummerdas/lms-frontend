export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
