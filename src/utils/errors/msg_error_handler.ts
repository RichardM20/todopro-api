export const messageErrorHandler = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return `${error}`
};
