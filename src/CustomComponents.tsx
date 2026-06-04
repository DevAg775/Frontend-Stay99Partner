import type { ReactNode } from "react";

export const FallbackComponent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

export function TextComponent({
  children,
}: {
  children: ReactNode[];
  className?: string;
}) {
  return children;
}

export function ImageComponent(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />;
}