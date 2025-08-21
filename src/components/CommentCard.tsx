import {
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

export default function CommentCard() {
  return (
    <div className="flex w-full gap-2.5 py-2">
      <UserCircleIcon className="size-8" />
      <div className="w-full space-y-1">
        <div className="bg-slate-100 p-2.5 rounded-sm">
          <p className="text-sm font-semibold">John Doe</p>
          <p className="text-sm wrap-break-word">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur. Bibendum adipiscing metus dolor diam in risus ut. Quis
            nam elit placerat egestas tellus.
          </p>
        </div>
        <div className="flex gap-1">
          <HandThumbUpIcon className="size-6" />
          <HandThumbDownIcon className="size-6" />
        </div>
      </div>
    </div>
  );
}
