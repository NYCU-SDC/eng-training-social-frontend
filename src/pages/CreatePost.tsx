import "./CreatePost.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";

export default function CreatePost() {
  return (
    <div className="main-container">
      <div className="create-post-nav">
        <ChevronLeftIcon className="md-icon" />
        <h1>Create a New Post</h1>
        <Button>Publish</Button>
      </div>
      <input placeholder="Title" />
      <textarea placeholder="Say Something About It..." />
    </div>
  );
}
