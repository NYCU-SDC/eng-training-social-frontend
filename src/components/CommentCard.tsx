import "./CommentCard.css";
import {
  UserCircleIcon,
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  HandThumbDownIcon as HandThumbDownOutlineIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
} from "@heroicons/react/24/solid";
import type { Comment, ReactionType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactToComment } from "@/requests/reactToComment";

export default function CommentCard({
  comment,
  postId,
}: {
  comment: Comment;
  postId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: react } = useMutation({
    mutationFn: (reaction: ReactionType) =>
      reactToComment(comment.id, reaction),
    onMutate: async (reaction) => {
      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        postId,
      ]);

      queryClient.setQueryData<Comment[]>(["comments", postId], (old) =>
        old?.map((c) =>
          c.id === comment.id ? { ...c, reactionMe: { reaction } } : c
        )
      );

      return { previousComments };
    },
    onError: (_err, _reaction, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", postId], context.previousComments);
      }
    },
  });

  const handleReact = (reaction: ReactionType) => {
    react(comment.reactionMe.reaction === reaction ? "NONE" : reaction);
  };

  const isLiked = comment.reactionMe.reaction === "LIKE";
  const isDisliked = comment.reactionMe.reaction === "DISLIKE";

  return (
    <div className="comment-card">
      <UserCircleIcon className="lg-icon" />
      <div className="comment-card-body">
        <div className="comment-card-text">
          <p className="comment-card-username">{comment.authorName}</p>
          <p>{comment.content}</p>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
}
