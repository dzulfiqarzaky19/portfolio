import * as React from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type PressAnimatedButtonProps = {
  to: string;
  children?: React.ReactNode;
  durationMs?: number;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const PressAnimatedButton = React.memo(
  React.forwardRef<HTMLButtonElement, PressAnimatedButtonProps>(
    function PressAnimatedButton(
      { to, children = "Case Study", durationMs = 1400, ariaLabel, disabled },
      ref
    ) {
      const controls = useAnimationControls();
      const navigate = useNavigate();
      const prefersReducedMotion = useReducedMotion();

      const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log({ to });

        e.preventDefault();
        if (disabled) return;

        try {
          if (!prefersReducedMotion) {
            await controls.start({
              backgroundColor: "rgba(99,102,241,0.25)", // indigo-500/25
              boxShadow: "0 0 12px rgba(99,102,241,0.40)",
              transition: { duration: 0.18 },
            });
            await controls.start({
              backgroundColor: "rgba(99,102,241,0.35)",
              boxShadow: "0 0 0 rgba(99,102,241,0)",
              transition: {
                duration: Math.max(0, (durationMs - 180) / 1000),
                ease: "easeOut",
              },
            });
          }
        } finally {
          if (import.meta.env.DEV) {
            console.log("PressAnimatedButton navigate", { to });
          }
          navigate(to);
        }
      };

      return (
        <motion.button
          ref={ref}
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent pager from seeing the click
            handleClick(e);
          }}
          onPointerDownCapture={(e) => e.stopPropagation()}
          onPointerUpCapture={(e) => e.stopPropagation()}
          onMouseDownCapture={(e) => e.stopPropagation()}
          onMouseUpCapture={(e) => e.stopPropagation()}
          data-pager-exempt // <-- attribute the pager can check
          style={{ touchAction: "manipulation" }} // avoid touch-to-click quirks
          animate={controls}
          initial={{
            backgroundColor: "transparent",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          className={cn(/* ...existing classes... */)}
          aria-label={
            ariaLabel ??
            (typeof children === "string" ? children : "Read the case study")
          }
          disabled={disabled}
          data-testid="press-animated-button"
        >
          {children}
        </motion.button>
      );
    }
  )
);
