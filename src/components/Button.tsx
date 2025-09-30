import { type ReactNode } from "react";
import "./Button.css";

export default function Button({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={["button-outline", className].join(" ")}>{children}</div>
  );
}
