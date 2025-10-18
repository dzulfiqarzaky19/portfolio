import { useMemo, type PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: "solid" | "outline";
}>;

const base =
  "rounded-lg h-12 px-6 text-base font-bold tracking-[0.015em] focus-visible:ring-2 focus-visible:ring-primary";

export const Button = ({
  children,
  onClick,
  variant = "solid",
}: ButtonProps) => {
  const styles = useMemo(() => {
    return variant === "solid"
      ? "bg-primary text-card-dark hover:opacity-90"
      : "border border-divider-dark text-text-primary-dark hover:bg-card-dark";
  }, [variant]);

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
};
