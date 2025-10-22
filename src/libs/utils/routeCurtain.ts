import type { TargetAndTransition, Transition } from "framer-motion";

export const routeOrder = [
  "/",
  "/about",
  "/shopstream",
  "/fit-track",
  "/web-novel",
  "/last-project",
] as const;

export type RoutePath = (typeof routeOrder)[number];

export const compareRoute = (a: string, b: string): "forward" | "backward" => {
  const ia = routeOrder.indexOf(a as RoutePath);
  const ib = routeOrder.indexOf(b as RoutePath);

  if (ia === -1 || ib === -1) return "forward";

  return ib > ia ? "forward" : "backward";
};

const DURATION_OVERLAY = 0.6;
const CONTENT_ANIM_DURATION = 0.5;
const CONTENT_EXIT_DURATION = 0.3;
const CONTENT_EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export const makeDir = (pathPrev: string, pathNow: string) => {
  return compareRoute(pathPrev, pathNow);
};

export const makeVariants = (dir: "forward" | "backward") => {
  const contentEnterY = dir === "forward" ? 20 : -20;
  const contentExitY = dir === "forward" ? -20 : 20;

  const contentInitial = { opacity: 0, y: contentEnterY };
  const contentAnimate: TargetAndTransition = {
    opacity: 1,
    y: 0,
    transition: {
      duration: CONTENT_ANIM_DURATION,
      ease: CONTENT_EASE,
      delay: DURATION_OVERLAY * 0.3,
    },
  };
  const contentExit: TargetAndTransition = {
    opacity: 0,
    y: contentExitY,
    transition: { duration: CONTENT_EXIT_DURATION, ease: CONTENT_EASE },
  };

  return {
    contentInitial,
    contentAnimate,
    contentExit,
  };
};
