import { useRef } from "react";
import PostCard from "@/components/PostCard.tsx";
import CommentCard from "@/components/CommentCard.tsx";
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getPost } from "@/requests/getPost.ts";
import { getCommentsByPostId } from "@/requests/getCommentsByPost.ts";
import { createComment } from "@/requests/createComment.ts";

export default function Post() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(["accessToken"]);

  // get post by id
  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  // get comments by post id
  const { data: comments, isLoading: isCommentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsByPostId(id!),
  });

  const { mutate: createCommentMutation, isPending: isCreatingComment } =
    useMutation({
      mutationFn: (content: string) =>
        createComment(id!, content, cookies.accessToken),
      onSuccess: async () => {
        // Clear the textarea
        if (textareaRef.current) {
          textareaRef.current.value = "";
          textareaRef.current.style.height = "auto"; // Reset height
        }
        // Invalidate and refetch comments
        const queryClient = new QueryClient();
        await queryClient.invalidateQueries({ queryKey: ["comments", id] });
      },
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
      {isPostLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading post...</p>
        </div>
      ) : (
        <PostCard
          id={post.id}
          title={post.title}
          content={post.content}
          authorName={post.authorName}
          authorID={post.authorId}
          showCommentsIcon={false}
        />
      )}
      <hr />
      <div className="h-full overflow-y-auto px-2.5">
        {isCommentsLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading comments...</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              content={comment.content}
              authorName={comment.authorName}
              authorId={comment.authorId}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-end pb-8 gap-5 px-5">
        <textarea
          ref={textareaRef}
          onInput={() => handleInput}
          className="border-2 border-slate-500 rounded-lg px-2.5 w-full resize-none max-h-50 min-h-8 overflow-y-auto"
          placeholder="Leave some comment..."
          rows={1} // minimum number of rows, some browsers' default is 2
        />
        <PaperAirplaneIcon
          onClick={() =>
            !isCreatingComment &&
            textareaRef.current?.value &&
            createCommentMutation(textareaRef.current?.value || "")
          }
          className="size-8"
        />
      </div>
    </div>
  );
}
