import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { Post, Comment } from "@/types/types";
import { getPost } from "@/requests/getPost";
import { getCommentsByPostId } from "@/requests/getCommentByPost";

export default function Post() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        // Fetch Post
        console.log("Fetching post with ID:", id);
        const postData = await getPost(id);
        console.log("Fetched post data:", postData);
        setPost(postData);

        // Fetch Comments
        const commentsData = await getCommentsByPostId(id);
        console.log("Fetched comments data:", commentsData);
        setComments(commentsData);
      }
    }
    fetchData();
  }, [id]);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // calculate the scrollHeight again. Prevent the height stuck due to manually set element height
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"; // 最大高度200px
    }
  };

  return (
    <div className="main-container">
      <ChevronLeftIcon
        className="md-icon back-icon"
        onClick={() => navigate("/")}
      />
      {post ? (
        <PostCard post={post} showCommentsIcon={false} />
      ) : (
        <p>Loading post...</p>
      )}
      <div className="comment-container">
        {comments ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>Loading comments...</p>
        )}
      </div>
      <div className="comment-input-container">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          className="comment-input"
          placeholder="Leave some comment..."
          rows={1} // minimum number of rows, some browsers' default is 2
        />
        <PaperAirplaneIcon className="lg-icon" />
      </div>
    </div>
  );
}
