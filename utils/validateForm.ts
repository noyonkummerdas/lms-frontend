export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  return errors;
};

export const validateForm = (formData: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!formData.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  if (!formData.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else {
    errors.push(...validatePassword(formData.password));
  }

  return errors;
};
