import type { Reaction, ReactionType } from "@/types/types.ts";

export async function reactToComment(
  commentId: string,
  reaction: ReactionType
): Promise<Reaction> {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/comment/${commentId}/react`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction }),
    }
  );

  if (!res.ok) {
    let errorStatus = res.status;
    let errorMessage = `failed to react to comment (${res.status})`;

    try {
      const error = await res.json();
      errorStatus = error.status || errorStatus;
      errorMessage = error.detail || errorMessage;
    } catch {
      // ignore
    }
    console.error("[reactToComment] Error:", errorMessage);
    const err = new Error(errorMessage);
    err.name = errorStatus.toString();
    throw err;
  }

  return res.json();
}
