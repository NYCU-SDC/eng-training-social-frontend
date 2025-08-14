import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();

  return (
    <div className="py-8 h-screen flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-2.5 py-5">
        <ChevronLeftIcon className="size-6" onClick={() => navigate("/")} />
        <h1 className="text-xl font-semibold">Create a New Post</h1>
        <Button>Publish</Button>
      </div>
      <input
        placeholder="Title"
        className="text-4xl p-2.5 focus:outline-none"
      />
      <textarea
        placeholder="Say Something About It..."
        className="text-xl p-2.5 focus:outline-none h-full"
      />
    </div>
  );
}
