import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

export default function PostCard({
  showCommentsIcon = true,
}: {
  showCommentsIcon?: boolean;
}) {
  return (
    <div className="flex flex-col w-full p-3.5">
      <div className="w-full flex items-center gap-2.5 py-2">
        <UserCircleIcon className="size-8" />
        <p className="text-sm">John Doe</p>
      </div>
      <h1 className="text-base font-semibold">
        Lorem ipsum dolor sit amet consectetur.
      </h1>
      {/**/}
      <p className="text-sm wrap-break-word">
        Lorem ipsum dolor sit amet consectetur. Bibendum adipiscing metus dolor
        diam in risus ut. Quis nam elit placerat egestas tellus rhoncus.
        Facilisis pretium et nunc metus urna nisi a. Molestie consequat ornare
        ac volutpat velit condimentum quis pellentesque.
      </p>
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
