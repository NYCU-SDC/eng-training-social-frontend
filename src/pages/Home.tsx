import PostCard from "@/components/PostCard";
import Navigation from "@/components/Navigation";
import Button from "@/components/Button.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { getPosts } from "@/requests/getPosts.ts";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(cookies.accessToken),
  });

  return (
    <div className="py-8 h-screen flex flex-col">
      <div className="h-full overflow-y-auto">
        <div className="justify-items-center py-4">
          <Button
            className="w-[200px]"
            onClick={() => navigate("/post/create")}
          >
            <PlusIcon className="size-6" />
            <p>New Post</p>
          </Button>
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading...</p>
            </div>
          ) : (
            data?.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                authorName={post.authorName}
                authorID={post.authorId}
                reaction={post.reactionMe.reaction}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-full bg-white">
        <Navigation />
      </div>
    </div>
  );
}
