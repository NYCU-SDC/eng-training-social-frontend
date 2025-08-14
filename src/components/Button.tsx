import { type ReactNode } from "react";

export default function Button({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={[
        "py-1 px-2 rounded-lg border-2 border-black flex justify-center items-center gap-1",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
