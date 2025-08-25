import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/requests/createPost.ts";

export default function CreatePost() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createPost({ title, content }, cookies.accessToken),
    onSuccess: () => {
      navigate(`/`);
    },
  });

  return (
    <div className="py-8 h-screen flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-2.5 py-5">
        <ChevronLeftIcon className="size-6" onClick={() => navigate("/")} />
        <h1 className="text-xl font-semibold">Create a New Post</h1>
        <Button
          onClick={() => createPostMutation({ title, content })}
          disabled={isPending || title.trim() === "" || content.trim() === ""}
        >
          Publish
        </Button>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="text-4xl p-2.5 focus:outline-none"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Say Something About It..."
        className="text-xl p-2.5 focus:outline-none h-full"
      />
    </div>
  );
}
