import { Reaction } from "@/types/types.ts";

type ReactionResponse = {
  reaction: Reaction;
};

export async function reactToPost(
  reaction: Reaction,
  postId: string,
  accessToken: string,
): Promise<ReactionResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/post/${postId}/react`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reaction }),
    },
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to post react to post (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[reactToPost] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
