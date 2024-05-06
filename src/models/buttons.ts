import { ReactNode } from "react";
export interface ButtonProps {
  className?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "primary" | "sub_primary" | "secondary" | "default";
  onClick?: () => void;
}
