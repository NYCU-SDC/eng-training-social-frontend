import "./Home.css";
import PostCard from "@/components/PostCard.tsx";
import Navigation from "@/components/Navigation.tsx";
import Button from "@/components/Button.tsx";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { getPosts } from "@/requests/getPosts";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "@/lib/authContext";
import { useContext } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(authContext);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="main-container">
      <div className="content-scroll">
        <div className="button-container">
          {isLoggedIn && (
            <Button
              className="new-post-button"
              onClick={() => navigate("/post/create")}
            >
              <PlusIcon className="md-icon" />
              <p>New Post</p>
            </Button>
          )}
        </div>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : isError ? (
          <p>Error loading posts.</p>
        ) : (
          posts && posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
      <div className="sticky-nav">
        <Navigation />
      </div>
    </div>
  );
}
