import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

export default function PostCard({
  id,
  title,
  content,
  showCommentsIcon = true,
}: {
  id: string;
  title: string;
  content: string;
  showCommentsIcon?: boolean;
}) {
  return (
    <div className="flex flex-col w-full p-3.5">
      <div className="w-full flex items-center gap-2.5 py-2">
        <UserCircleIcon className="size-8" />
        <p className="text-sm">John Doe</p>
      </div>
      <h1 className="text-base font-semibold wrap-break-word">{title}</h1>
      {/**/}
      <p className="text-sm wrap-break-word">{content}</p>
      <div className="flex items-center justify-evenly">
        <HandThumbUpIcon className="size-6" />
        <HandThumbDownIcon className="size-6" />
        {showCommentsIcon ? (
          <Link to={`/post/${id}`}>
            <ChatBubbleOvalLeftIcon className="size-6" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
