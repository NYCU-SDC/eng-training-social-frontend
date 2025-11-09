import "./Home.css";
import PostCard from "@/components/PostCard.tsx";
import Navigation from "@/components/Navigation.tsx";
import Button from "@/components/Button.tsx";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPosts } from "@/requests/getPosts";
import type { Post } from "@/types/types";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="main-container">
      <div className="content-scroll">
        <div className="button-container">
          <Button
            className="new-post-button"
            onClick={() => navigate("/post/create")}
          >
            <PlusIcon className="md-icon" />
            <p>New Post</p>
          </Button>
        </div>
        {posts ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
      <div className="sticky-nav">
        <Navigation />
      </div>
    </div>
  );
}
