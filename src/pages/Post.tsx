import "./Post.css";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router";
import { useRef, useState } from "react";
import { getPost } from "@/requests/getPost";
import { getCommentsByPostId } from "@/requests/getCommentByPost";
import { createComment } from "@/requests/createComment";
import type { Comment } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [cookies] = useCookies(["token"]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [commentContent, setCommentContent] = useState("");

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ["post", id, cookies.token],
    queryFn: () => getPost(id!, cookies.token),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", id, cookies.token],
    queryFn: () => getCommentsByPostId(id!, cookies.token),
  });

  const { mutate: submitComment, isPending: isSubmittingComment } =
    useMutation({
      mutationFn: (content: string) =>
        createComment(id!, content, cookies.token),
      onSuccess: (newComment) => {
        queryClient.setQueryData<Comment[]>(
          ["comments", id, cookies.token],
          (old) => (old ? [...old, newComment] : [newComment])
        );
        setCommentContent("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      },
    });

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // calculate the scrollHeight again. Prevent the height stuck due to manually set element height
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"; // 最大高度200px
    }
  };

  const handleSubmitComment = () => {
    const content = commentContent.trim();
    if (!content || isSubmittingComment) return;
    submitComment(content);
  };

  return (
    <div className="main-container">
      <ChevronLeftIcon
        className="md-icon back-icon"
        onClick={() => navigate("/")}
      />
      {isPostLoading ? (
        <p>Loading post...</p>
      ) : isPostError ? (
        <p>Error loading post.</p>
      ) : (
        post && <PostCard post={post} showCommentsIcon={false} />
      )}
      <div className="comment-container">
        {isCommentsLoading ? (
          <p>Loading comments...</p>
        ) : isCommentsError ? (
          <p>Error loading comments.</p>
        ) : (
          comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={id!} />
          ))
        )}
      </div>
      <div className="comment-input-container">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          }}
          className="comment-input"
          placeholder="Leave some comment..."
          rows={1} // minimum number of rows, some browsers' default is 2
        />
        <PaperAirplaneIcon className="lg-icon" onClick={handleSubmitComment} />
      </div>
    </div>
  );
}
