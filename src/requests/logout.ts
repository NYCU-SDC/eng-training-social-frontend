export async function logout(token: string): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to logout (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[logout] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
