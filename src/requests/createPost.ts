import { type Post } from "@/types/types.ts";

type CreatePostRequest = {
  title: string;
  content: string;
};

export async function createPost(
  post: CreatePostRequest,
  accessToken: string,
): Promise<Post> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(post),
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to create post (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[createPost] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
