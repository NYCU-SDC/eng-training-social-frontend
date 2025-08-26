import { type User } from "@/types/types.ts";

export async function unfollowUserById(
  id: string,
  accessToken: string,
): Promise<User> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/user/${id}/unfollow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to unfollow user (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[unfollowUserById] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
