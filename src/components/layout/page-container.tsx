import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "standard" | "wide";
};

const containerSizes = {
  standard: "max-w-5xl",
  wide: "max-w-7xl",
} as const;

export function PageContainer({
  children,
  className = "",
  size = "wide",
}: PageContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
        containerSizes[size],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
