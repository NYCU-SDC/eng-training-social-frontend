export async function logout(accessToken: string): Promise<void> {
  await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
