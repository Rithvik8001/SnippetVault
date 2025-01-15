// types/auth.ts
export type AuthError = {
  message: string;
  status?: number;
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_IN_USE: "Email already in use",
  WEAK_PASSWORD: "Password must be at least 6 characters long",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  INVALID_EMAIL: "Please enter a valid email address",
  GOOGLE_AUTH_ERROR: "Error signing in with Google. Please try again",
  DEFAULT: "An unexpected error occurred. Please try again",
} as const;
