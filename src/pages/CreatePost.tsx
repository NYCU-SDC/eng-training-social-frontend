import "./CreatePost.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="create-post-nav">
        <ChevronLeftIcon className="md-icon" onClick={() => navigate("/")} />
        <h1>Create a New Post</h1>
        <Button>Publish</Button>
      </div>
      <input placeholder="Title" />
      <textarea placeholder="Say Something About It..." />
    </div>
  );
}
