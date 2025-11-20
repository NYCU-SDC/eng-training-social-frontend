type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

export async function refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/refreshToken/${refreshToken}`
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to refresh token (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[refreshToken] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
