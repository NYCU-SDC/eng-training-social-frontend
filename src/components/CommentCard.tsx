import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

export default function CommentCard({
  content,
  authorId,
  authorName,
}: {
  content: string;
  authorName: string;
  authorId: string;
}) {
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
          <HandThumbUpIcon className="size-6" />
          <HandThumbDownIcon className="size-6" />
        </div>
      </div>
    </div>
  );
}
