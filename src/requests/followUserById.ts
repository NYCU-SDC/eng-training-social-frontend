import { type User } from "@/types/types.ts";

export async function followUserById(
  id: string,
  accessToken: string,
): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to follow user (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[followUserById] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
