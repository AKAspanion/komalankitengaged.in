import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ZodError) {
    const validationError = fromZodError(error);
    return validationError.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Something went wrong";
  }
};
