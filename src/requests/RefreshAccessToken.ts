import { type AuthCookie } from "@/types/types";

export async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthCookie> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/refreshToken/${refreshToken}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `Failed to refresh auth token (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[refreshAuthToken] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
