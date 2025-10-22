import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { makeDir, makeVariants } from "../../libs/utils/routeCurtain";

interface RouteCurtainProps {
  onPageReady?: () => void;
  location: ReturnType<typeof useLocation>;
}

export const RouteCurtain = ({ onPageReady, location }: RouteCurtainProps) => {
  const { pathname, key } = location;

  const reduced = useReducedMotion();
  const prevPathRef = React.useRef(pathname);

  React.useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  const dir = makeDir(prevPathRef.current, pathname);
  const { contentInitial, contentAnimate, contentExit } = makeVariants(dir);

  const pageBg =
    pathname === "/"
      ? "bg-[color:var(--color-bg-dark)]"
      : "bg-[color:var(--color-bg-light)]";

  if (reduced) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={key} className={`min-h-dvh ${pageBg}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Outlet />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        className={`relative min-h-dvh overflow-hidden ${pageBg}`}
        style={{ willChange: "clip-path, opacity, transform" }}
      >
        <motion.div
          className="relative z-10"
          initial={contentInitial}
          animate={contentAnimate}
          exit={contentExit}
          onAnimationStart={(definition) => {
            if (definition === "animate" && onPageReady) {
              onPageReady();
            }
          }}
          style={{ willChange: "opacity, transform" }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
