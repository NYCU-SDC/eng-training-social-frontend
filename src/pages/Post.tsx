import { useRef } from "react";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/requests/GetPost.tsx";
import { getCommentsByPostId } from "@/requests/GetCommentsByPost.tsx";

export default function Post() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // get post by id
  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  // get comments by post id
  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id!),
  });

  if (!id) {
    // If id is not provided, navigate back to home
    navigate("/");
    return null;
  }

  if (!post || !comments) {
    return null;
  }

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"; // 最大高度200px
    }
  };

  return (
    <div className="py-8 h-screen flex flex-col">
      <ChevronLeftIcon
        className="size-6 mt-5 ml-2"
        onClick={() => navigate("/")}
      />
      <PostCard
        title={post.title}
        content={post.content}
        showCommentsIcon={false}
      />
      <hr />
      <div className="h-full overflow-y-auto px-2.5">
        {comments.map((comment) => (
          <CommentCard key={comment.id} content={comment.content} />
        ))}
      </div>
      <div className="flex justify-center items-end pb-8 gap-5 px-5">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          className="border-2 border-slate-500 rounded-lg px-2.5 w-full resize-none max-h-50 min-h-8 overflow-y-auto"
          placeholder="Leave some comment..."
          rows={1} // minimum number of rows, some browsers' default is 2
        />
        <PaperAirplaneIcon className="size-8" />
      </div>
    </div>
  );
}
