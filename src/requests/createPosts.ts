type CreatePostsRequest = {
  title: string;
  content: string;
};

export async function createPosts(
  newPost: CreatePostsRequest,
  token: string
): Promise<void> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPost),
    }
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
    console.error("[createPosts] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  // success response code is 204 No Content
  return;
}
