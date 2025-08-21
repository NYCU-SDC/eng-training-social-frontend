import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

export default function PostCard({
  title,
  content,
  showCommentsIcon = true,
}: {
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
      <h1 className="text-base font-semibold">{title}</h1>
      {/**/}
      <p className="text-sm">{content}</p>
      <div className="flex items-center justify-evenly">
        <HandThumbUpIcon className="size-6" />
        <HandThumbDownIcon className="size-6" />
        {showCommentsIcon ? (
          <ChatBubbleOvalLeftIcon className="size-6" />
        ) : null}
      </div>
    </div>
  );
}
