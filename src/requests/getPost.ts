import type { Post } from "@/types/types.ts";

export async function getPost(postId: string): Promise<Post> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post/${postId}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to fetch post (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[getPost] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
