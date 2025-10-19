// src/hooks/useSectionPager.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";

type Options = {
  enableControls?: boolean; // default true
  infinite?: boolean; // default true
  loopSeamless?: boolean; // default true
};

const COOLDOWN_MS = 650;
const WHEEL_THRESHOLD = 10; // min deltaY to trigger
const SWIPE_THRESHOLD = 60; // px
const SWIPE_VEL = 0.5; // px/ms
const DURATION_MS = 600;
const EASE = [0.16, 1, 0.3, 1] as const;

export function useSectionPager({
  enableControls = true,
  infinite = true,
  loopSeamless = true,
}: Options = {}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const busy = useRef(false);

  const getEls = useCallback(() => {
    const container = document.getElementById("mainContainer");
    const sections = container
      ? Array.from(container.querySelectorAll<HTMLElement>(".section"))
      : [];
    return { container, sections };
  }, []);

  const cancelAnim = useCallback(() => {
    anim.current?.stop();
    anim.current = null;
  }, []);

  const tweenScrollLeft = useCallback(
    (container: HTMLElement, toX: number, behavior: ScrollBehavior) => {
      if (behavior === "auto") {
        cancelAnim();
        container.scrollLeft = toX;
        return;
      }
      cancelAnim();
      const fromX = container.scrollLeft;
      if (Math.abs(toX - fromX) < 1) {
        container.scrollLeft = toX;
        return;
      }
      anim.current = animate(fromX, toX, {
        duration: DURATION_MS / 1000,
        ease: EASE,
        onUpdate: (v) => (container.scrollLeft = v),
        onStop: () => (anim.current = null),
        onComplete: () => (anim.current = null),
      });
    },
    [cancelAnim]
  );

  const goToIndex = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const { container, sections } = getEls();
      if (!container || sections.length === 0) return;

      const total = sections.length;
      let idx = rawIdx;

      if (loopSeamless) {
        if (idx < 0) idx = 0;
        if (idx > total - 1) idx = total - 1;
      } else if (infinite) {
        idx = (rawIdx + total) % total;
      } else {
        idx = Math.max(0, Math.min(rawIdx, total - 1));
      }

      indexRef.current = idx;
      setIndex(idx);

      const target = sections[idx];
      tweenScrollLeft(container, target.offsetLeft, behavior);
    },
    [getEls, infinite, loopSeamless, tweenScrollLeft]
  );

  useEffect(() => {
    const { container, sections } = getEls();
    if (!container || sections.length === 0) return;

    const total = sections.length;
    const lastReal = loopSeamless ? total - 2 : total - 1;

    let jumpTimer: number | undefined;

    const onScroll = () => {
      const size = Math.max(1, container.clientWidth);
      const cur = Math.round(container.scrollLeft / size);

      if (loopSeamless) {
        if (cur === total - 1) {
          setIndex(1);
          indexRef.current = total - 1;
          window.clearTimeout(jumpTimer);
          jumpTimer = window.setTimeout(() => goToIndex(1, "auto"), 40);
          return;
        }
        if (cur === 0) {
          setIndex(lastReal);
          indexRef.current = 0;
          window.clearTimeout(jumpTimer);
          jumpTimer = window.setTimeout(() => goToIndex(lastReal, "auto"), 40);
          return;
        }
      }

      if (cur !== indexRef.current) {
        indexRef.current = cur;
        setIndex(cur);
      }
    };

    const onResize = () => goToIndex(indexRef.current, "auto");

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(jumpTimer);
    };
  }, [getEls, goToIndex, loopSeamless]);

  useEffect(() => {
    if (!enableControls) return;
    const { container } = getEls();
    if (!container) return;

    let cooldownTimer: number | undefined;

    const trigger = (dir: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      cancelAnim();
      goToIndex(indexRef.current + dir, "smooth");
      window.clearTimeout(cooldownTimer);
      cooldownTimer = window.setTimeout(
        () => (busy.current = false),
        COOLDOWN_MS
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      e.preventDefault();
      trigger(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") trigger(1);
      if (e.key === "ArrowLeft") trigger(-1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(cooldownTimer);
    };
  }, [enableControls, getEls, goToIndex, cancelAnim]);

  useEffect(() => {
    if (!enableControls) return;
    const { container } = getEls();
    if (!container) return;

    let startX = 0;
    let lastX = 0;
    let startT = 0;
    let dragging = false;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startX = lastX = e.clientX;
      startT = performance.now();
      cancelAnim();
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      lastX = e.clientX;
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      const dx = lastX - startX; // +dx → previous
      const dt = Math.max(1, performance.now() - startT);
      const vel = Math.abs(dx) / dt;

      if (Math.abs(dx) > SWIPE_THRESHOLD || vel > SWIPE_VEL) {
        const dir: 1 | -1 = dx < 0 ? 1 : -1; // left → next
        goToIndex(indexRef.current + dir, "smooth");
      } else {
        goToIndex(indexRef.current, "smooth"); // snap back
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [enableControls, getEls, goToIndex, cancelAnim]);

  const realCount = useMemo(() => {
    const { sections } = getEls();
    return loopSeamless ? Math.max(0, sections.length - 2) : sections.length;
  }, [getEls, loopSeamless]);

  return useMemo(
    () => ({ index, goToIndex, realCount }),
    [index, goToIndex, realCount]
  );
}
