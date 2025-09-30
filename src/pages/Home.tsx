import "./Home.css";
import PostCard from "@/components/PostCard.tsx";
import Navigation from "@/components/Navigation.tsx";
import Button from "@/components/Button.tsx";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="main-container">
      <div className="content-scroll">
        <div className="button-container">
          <Button className="new-post-button">
            <PlusIcon className="md-icon" />
            <p>New Post</p>
          </Button>
        </div>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <div className="sticky-nav">
        <Navigation />
      </div>
    </div>
  );
}
