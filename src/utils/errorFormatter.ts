import { ZodError } from 'zod';

export const formatZodError = (error: ZodError) => {
  return {
    error: "Validation failed",
    details: error.issues.map(issue => ({
      field: issue.path.join('.'), // supports nested fields
      message: issue.message,
    })),
  };
};