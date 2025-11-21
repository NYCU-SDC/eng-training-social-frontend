import "./CreatePost.css";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button.tsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { createPosts } from "@/requests/createPosts";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cookie] = useCookies(["token"]);

  const handlePublish = async () => {
    if (!cookie.token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await createPosts({ title, content }, cookie.token);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="create-post-nav">
        <ChevronLeftIcon className="md-icon" onClick={() => navigate("/")} />
        <h1>Create a New Post</h1>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Say Something About It..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
