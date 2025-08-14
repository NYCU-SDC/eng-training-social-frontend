import PostCard from "@/components/PostCard";
import Navigation from "@/components/Navigation";
import NewPostButton from "@/components/NewPostButton.tsx";

export default function Home() {
  return (
    <div className="py-8 h-screen relative flex flex-col">
      <div className="h-full overflow-y-auto">
        <div className="justify-items-center py-4">
          <NewPostButton />
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
