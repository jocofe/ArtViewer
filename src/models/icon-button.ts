
export interface IconBtnProps {
  className?: string;
  onClick: () => void;
  icon: React.ReactNode;
  size?: "small" | "medium";
  position?: "absolute" | "default";
}
