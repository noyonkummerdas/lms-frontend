export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateNumber: string;
  issuedDate: string;
  expiryDate?: string;
}
