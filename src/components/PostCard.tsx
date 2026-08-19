import "./PostCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  HandThumbDownIcon as HandThumbDownOutlineIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";
import { type Post, type ReactionType } from "@/types/types";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactToPost } from "@/requests/reactToPost";

export default function PostCard({
  post,
  showCommentsIcon = true,
}: {
  post: Post;
  showCommentsIcon?: boolean;
}) {
  const queryClient = useQueryClient();

  const { mutate: react } = useMutation({
    mutationFn: (reaction: ReactionType) => reactToPost(post.id, reaction),
    onMutate: async (reaction) => {
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      const previousPost = queryClient.getQueryData<Post>(["post", post.id]);

      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.map((p) =>
          p.id === post.id ? { ...p, reactionMe: { reaction } } : p
        )
      );
      queryClient.setQueryData<Post>(["post", post.id], (old) =>
        old ? { ...old, reactionMe: { reaction } } : old
      );

      return { previousPosts, previousPost };
    },
    onError: (_err, _reaction, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", post.id], context.previousPost);
      }
    },
  });

  const handleReact = (reaction: ReactionType) => {
    react(post.reactionMe.reaction === reaction ? "NONE" : reaction);
  };

  const isLiked = post.reactionMe.reaction === "LIKE";
  const isDisliked = post.reactionMe.reaction === "DISLIKE";

  return (
    <div className="card-container">
      <div className="user-info">
        <UserCircleIcon className="lg-icon" />
        <p>{post.authorName}</p>
      </div>
      <h1 className="card-title">{post.title}</h1>
      <p className="card-text">{post.content}</p>
      <div className="reaction-container">
        {isLiked ? (
          <HandThumbUpSolidIcon
            className="md-icon"
            onClick={() => handleReact("LIKE")}
          />
        ) : (
          <HandThumbUpOutlineIcon
            className="md-icon"
            onClick={() => handleReact("LIKE")}
          />
        )}
        {isDisliked ? (
          <HandThumbDownSolidIcon
            className="md-icon"
            onClick={() => handleReact("DISLIKE")}
          />
        ) : (
          <HandThumbDownOutlineIcon
            className="md-icon"
            onClick={() => handleReact("DISLIKE")}
          />
        )}
        {showCommentsIcon && (
          <Link to={`/post/${post.id}`}>
            <ChatBubbleOvalLeftIcon className="md-icon" />
          </Link>
        )}
      </div>
    </div>
  );
}
