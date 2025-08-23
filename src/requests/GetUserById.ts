import { type User } from "@/types/types.ts";

export async function getUserById(
  userId: string,
  accessToken: string,
): Promise<User> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to fetch user information (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[getUserById] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
