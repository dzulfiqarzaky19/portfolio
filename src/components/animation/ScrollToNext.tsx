import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_CONST } from "../../libs/const/Home";

function nextSectionId(pathname: string) {
  const i = HOME_CONST.findIndex((p) => p.link === pathname);
  const next = i >= 0 ? (i + 1) % HOME_CONST.length : 0;
  return HOME_CONST[next].id;
}

export function ScrollSnapNextOnBottom() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const DOUBLE_MS = 800;
  const DWELL_MS = 1200;
  const COOLDOWN = 800;

  const containerRef = React.useRef<HTMLElement | null>(null);
  const coolingRef = React.useRef(false);
  const lastDownAtRef = React.useRef(0);
  const dwellTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    containerRef.current = document.getElementById(
      "pageScroll"
    ) as HTMLElement | null;
  }, []);

  const atBottom = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return false;

    const scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) return false;

    const EPS = 1;
    return el.scrollTop + el.clientHeight >= el.scrollHeight - EPS;
  }, []);

  const cancelDwell = React.useCallback(() => {
    if (dwellTimerRef.current != null) {
      window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
  }, []);

  const snapNext = React.useCallback(() => {
    if (coolingRef.current) return;
    if (!atBottom()) return;
    coolingRef.current = true;
    cancelDwell();
    const id = nextSectionId(pathname);
    navigate(`/?section=${encodeURIComponent(id)}`);
    window.setTimeout(() => (coolingRef.current = false), COOLDOWN);
  }, [atBottom, cancelDwell, navigate, pathname]);

  React.useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const down = dy > 0;

      if (!down) {
        cancelDwell();
        return;
      }

      if (!atBottom()) {
        cancelDwell();
        return;
      }

      e.preventDefault();

      const now = performance.now();
      if (now - lastDownAtRef.current <= DOUBLE_MS) {
        snapNext();
        return;
      }
      lastDownAtRef.current = now;

      if (dwellTimerRef.current == null) {
        dwellTimerRef.current = window.setTimeout(() => {
          if (atBottom()) snapNext();
        }, DWELL_MS);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [DOUBLE_MS, DWELL_MS, atBottom, cancelDwell, snapNext]);

  React.useEffect(() => {
    let startY = 0;
    let lastY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = lastY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      lastY = e.touches[0]?.clientY ?? lastY;
    };
    const onTouchEnd = () => {
      const swipeUp = startY - lastY > 10;
      if (!swipeUp) {
        cancelDwell();
        return;
      }
      if (!atBottom()) {
        cancelDwell();
        return;
      }

      const now = performance.now();
      if (now - lastDownAtRef.current <= DOUBLE_MS) {
        snapNext();
        return;
      }
      lastDownAtRef.current = now;

      if (dwellTimerRef.current == null) {
        dwellTimerRef.current = window.setTimeout(() => {
          if (atBottom()) snapNext();
        }, DWELL_MS);
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [DOUBLE_MS, DWELL_MS, atBottom, cancelDwell, snapNext]);

  React.useEffect(() => {
    cancelDwell();
    coolingRef.current = false;
    lastDownAtRef.current = 0;
  }, [pathname, cancelDwell]);

  return null;
}
