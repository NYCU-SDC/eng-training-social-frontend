import PostCard from "@/components/PostCard";
import Navigation from "@/components/Navigation";
import Button from "@/components/Button.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="py-8 h-screen flex flex-col">
      <div className="h-full overflow-y-auto">
        <div className="justify-items-center py-4">
          <Button className="w-[200px]">
            <PlusIcon className="size-6" />
            <p>New Post</p>
          </Button>
        </div>
        <div className="flex flex-col">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      <div className="w-full bg-white">
        <Navigation />
      </div>
    </div>
  );
}
