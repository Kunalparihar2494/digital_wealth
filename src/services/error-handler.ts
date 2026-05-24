export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  const apiError = error as {
    response?: { status: number; data?: { message?: string } };
    request?: unknown;
    name?: string;
    message?: string;
  };

  if (apiError.response) {
    const status = apiError.response.status;
    const message = apiError.response.data?.message || "Server error";

    if (status === 401) {
      return new AppError(
        "UNAUTHORIZED",
        401,
        "Session expired. Please login again.",
      );
    }

    if (status === 403) {
      return new AppError(
        "FORBIDDEN",
        403,
        "You don't have permission to perform this action",
      );
    }

    if (status === 404) {
      return new AppError("NOT_FOUND", 404, "Resource not found");
    }

    if (status === 422) {
      return new AppError("VALIDATION_ERROR", 422, message);
    }

    if (status >= 500) {
      return new AppError(
        "SERVER_ERROR",
        status,
        "Server error. Please try again later.",
      );
    }

    return new AppError("API_ERROR", status, message);
  }

  if (apiError.request && !apiError.response) {
    return new AppError(
      "NETWORK_ERROR",
      0,
      "Network error. Check your internet connection.",
    );
  }

  if (apiError.name === "AbortError") {
    return new AppError("TIMEOUT_ERROR", 0, "Request timeout. Please try again.");
  }

  return new AppError(
    "UNKNOWN_ERROR",
    0,
    apiError.message || "An unexpected error occurred",
  );
};
