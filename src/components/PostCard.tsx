import {
  UserCircleIcon,
  HandThumbUpIcon as HandThumbUpOutline,
  HandThumbDownIcon as HandThumbDownOutline,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { Reaction } from "@/types/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactToPost } from "@/requests/reactToPost.ts";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function PostCard({
  id,
  title,
  content,
  authorName,
  authorID,
  showCommentsIcon = true,
  reaction,
}: {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorID: string;
  showCommentsIcon?: boolean;
  reaction: Reaction;
}) {
  const [reactionState, setReactionState] = useState<Reaction>(reaction);
  const [cookies] = useCookies(["accessToken"]);
  const queryClient = useQueryClient();

  const { mutate: reactToPostMutation, reset: resetMutation } = useMutation({
    mutationFn: (newReaction: Reaction) =>
      reactToPost(newReaction, id, cookies.accessToken),
    onMutate: () => {
      resetMutation();
    },
    onSuccess: async (data) => {
      setReactionState(data.reaction);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  return (
    <div className="flex flex-col w-full p-3.5">
      <div className="py-2 flex">
        <Link to={`/user/${authorID}`} className="flex items-center gap-2.5">
          <UserCircleIcon className="size-8" />
          <p className="text-sm">{authorName}</p>
        </Link>
      </div>
      <h1 className="text-base font-semibold wrap-break-word">{title}</h1>
      {/**/}
      <p className="text-sm wrap-break-word">{content}</p>
      <div className="flex items-center justify-evenly">
        {reactionState === Reaction.LIKE ? (
          <HandThumbUpSolid
            onClick={() => reactToPostMutation(Reaction.NONE)}
            className="size-6"
          />
        ) : (
          <HandThumbUpOutline
            onClick={() => reactToPostMutation(Reaction.LIKE)}
            className="size-6"
          />
        )}
        {reactionState === Reaction.DISLIKE ? (
          <HandThumbDownSolid
            onClick={() => reactToPostMutation(Reaction.NONE)}
            className="size-6"
          />
        ) : (
          <HandThumbDownOutline
            onClick={() => reactToPostMutation(Reaction.DISLIKE)}
            className="size-6"
          />
        )}
        {showCommentsIcon ? (
          <Link to={`/post/${id}`}>
            <ChatBubbleOvalLeftIcon className="size-6" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
