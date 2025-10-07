import { type ReactNode } from "react";
import "./Button.css";

export default function Button({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className={["button-outline", className].join(" ")} onClick={onClick}>
      {children}
    </div>
  );
}
