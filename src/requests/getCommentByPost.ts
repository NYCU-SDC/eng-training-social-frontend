import { type Comment } from "@/types/types.ts";

export async function getCommentsByPostId(id: string): Promise<Comment[]> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post/${id}/comments`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to fetch comments (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[getCommentsByPostId] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
