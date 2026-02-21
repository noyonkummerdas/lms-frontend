export const calculateProgress = (
  completedLessons: number,
  totalLessons: number
): number => {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
};

export const calculateCourseProgress = (
  enrollments: any[],
  courseId: string
): number => {
  const enrollment = enrollments.find((e) => e.courseId === courseId);
  return enrollment?.progress || 0;
};
