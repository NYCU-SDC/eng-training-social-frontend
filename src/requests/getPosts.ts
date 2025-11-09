import { type Post } from "@/types/types.ts";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/posts`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to fetch posts (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[getPosts] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
