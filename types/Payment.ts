export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  transactionId: string;
  status: "pending" | "completed" | "failed";
  paymentMethod: "credit_card" | "paypal" | "stripe";
  createdAt: string;
  updatedAt: string;
}
