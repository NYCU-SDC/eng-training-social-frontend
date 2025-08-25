import { type ReactNode } from "react";

export default function Button({
  className,
  onClick,
  disabled,
  children,
}: {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      className={[
        `py-1 px-2 rounded-lg border-2 border-black flex justify-center items-center gap-1 ${disabled ? "opacity-50" : ""}`,
        className,
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
