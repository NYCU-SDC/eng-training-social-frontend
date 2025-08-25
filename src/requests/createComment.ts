import { type Comment } from "@/types/types.ts";

export async function createComment(
  postId: string,
  content: string,
  accessToken: string,
): Promise<Comment> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to create comment (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[createComment] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
