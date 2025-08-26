import {
  UserCircleIcon,
  HandThumbUpIcon as HandThumbUpOutline,
  HandThumbDownIcon as HandThumbDownOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { Reaction } from "@/types/types.ts";
import { reactToComment } from "@/requests/reactToComment.ts";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function CommentCard({
  id,
  content,
  authorId,
  authorName,
  reaction,
}: {
  id: string;
  content: string;
  authorName: string;
  authorId: string;
  reaction: Reaction;
}) {
  const [reactionState, setReactionState] = useState<Reaction>(reaction);
  const [cookies] = useCookies(["accessToken"]);

  const { mutate: reactToCommentMutation, reset: resetMutation } = useMutation({
    mutationFn: (newReaction: Reaction) =>
      reactToComment(newReaction, id, cookies.accessToken),
    onMutate: () => {
      resetMutation();
    },
    onSuccess: async (data) => {
      setReactionState(data.reaction);
    },
  });

  return (
    <div className="flex w-full gap-2.5 py-2">
      <Link to={`/user/${authorId}`}>
        <UserCircleIcon className="size-8" />
      </Link>
      <div className="w-full space-y-1">
        <div className="bg-slate-100 p-2.5 rounded-sm">
          <p className="text-sm font-semibold">{authorName}</p>
          <p className="text-sm wrap-break-word">{content}</p>
        </div>
        <div className="flex gap-1">
          {reactionState === Reaction.LIKE ? (
            <HandThumbUpSolid
              onClick={() => reactToCommentMutation(Reaction.NONE)}
              className="size-6"
            />
          ) : (
            <HandThumbUpOutline
              onClick={() => reactToCommentMutation(Reaction.LIKE)}
              className="size-6"
            />
          )}
          {reactionState === Reaction.DISLIKE ? (
            <HandThumbDownSolid
              onClick={() => reactToCommentMutation(Reaction.NONE)}
              className="size-6"
            />
          ) : (
            <HandThumbDownOutline
              onClick={() => reactToCommentMutation(Reaction.DISLIKE)}
              className="size-6"
            />
          )}
        </div>
      </div>
    </div>
  );
}
