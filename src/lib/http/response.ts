import "server-only";
import { ApiError } from "@/lib/errors/api-error";

export function apiSuccess<T>(data: T, status = 200) {
  const requestId = crypto.randomUUID();
  return Response.json(
    { data, meta: { requestId } },
    {
      status,
      headers: {
        "X-Request-Id": requestId,
        "Cache-Control": "private, no-store",
      },
    },
  );
}

export function apiError(error: unknown) {
  const requestId = crypto.randomUUID();
  const known = error instanceof ApiError;
  const status = known ? error.status : 500;
  // Intentionally omit arbitrary error objects, request bodies, and credentials.
  console.error(
    JSON.stringify({
      event: "api_error",
      requestId,
      status,
      code: known ? error.code : "INTERNAL_ERROR",
    }),
  );
  return Response.json(
    {
      error: {
        code: known ? error.code : "INTERNAL_ERROR",
        message: known ? error.message : "An unexpected error occurred.",
        retryable: known ? error.retryable : false,
      },
      meta: { requestId },
    },
    {
      status,
      headers: {
        "X-Request-Id": requestId,
        "Cache-Control": "private, no-store",
      },
    },
  );
}
