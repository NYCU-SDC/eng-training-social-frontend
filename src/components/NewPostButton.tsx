import { PlusIcon } from "@heroicons/react/24/outline";

export default function NewPostButton() {
  return (
    <div className="w-[200px] h-8 rounded-lg border-2 border-black flex justify-center items-center gap-1">
      <PlusIcon className="size-6" />
      <p>New Post</p>
    </div>
  );
}
