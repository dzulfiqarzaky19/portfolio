import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";

export function useSectionPager() {
  const SWIPE_PX = 60;
  const SWIPE_VEL = 0.5;

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const indexRef = useRef(0);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const isJumping = useRef(false);

  const containerRef = useRef<HTMLElement | null>(null);

  const getEls = useCallback(() => {
    if (!containerRef.current) {
      containerRef.current = document.getElementById(
        "mainContainer"
      ) as HTMLElement | null;
    }
    const container = containerRef.current;
    const sections = container
      ? Array.from(container.querySelectorAll<HTMLElement>(".section"))
      : [];
    return { container, sections };
  }, []);

  useEffect(() => {
    const container = document.getElementById("mainContainer");
    if (!container) return;

    const check = () => {
      const has = container.querySelectorAll(".section").length > 0;
      if (has) setReady(true);
      return has;
    };

    if (check()) return;
    const mo = new MutationObserver(() => {
      if (check()) mo.disconnect();
    });
    mo.observe(container, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  const cancelAnim = useCallback(() => {
    anim.current?.stop();
    anim.current = null;
  }, []);

  const disableSnapJump = useCallback(
    (container: HTMLElement, toX: number) => {
      const prevSnap = container.style.scrollSnapType;
      container.style.scrollSnapType = "none";
      isJumping.current = true;

      cancelAnim();
      container.scrollLeft = toX;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.scrollSnapType = prevSnap || "";
          isJumping.current = false;
        });
      });
    },
    [cancelAnim]
  );

  const tweenScrollLeft = useCallback(
    (container: HTMLElement, toX: number, instant = false) => {
      if (instant) {
        disableSnapJump(container, toX);
        return;
      }
      cancelAnim();
      const fromX = container.scrollLeft;
      if (Math.abs(toX - fromX) < 1) {
        container.scrollLeft = toX;
        return;
      }
      anim.current = animate(fromX, toX, {
        type: "spring",
        stiffness: 220,
        damping: 26,
        onUpdate: (v) => (container.scrollLeft = v),
        onStop: () => (anim.current = null),
        onComplete: () => (anim.current = null),
      });
    },
    [cancelAnim, disableSnapJump]
  );

  const goToIndex = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const { container, sections } = getEls();
      if (!container || sections.length === 0) return;

      const total = sections.length;
      const idx = Math.max(0, Math.min(rawIdx, total - 1));
      indexRef.current = idx;
      setIndex(idx);

      const target = sections[idx];
      tweenScrollLeft(container, target.offsetLeft, behavior === "auto");
    },
    [getEls, tweenScrollLeft]
  );

  useEffect(() => {
    if (!ready) return;
    const { container, sections } = getEls();
    if (!container || sections.length === 0) return;

    const total = sections.length;

    const onScroll = () => {
      if (isJumping.current) return;

      // Use actual step between sections to avoid rounding glitches
      const step =
        sections.length > 1
          ? sections[1].offsetLeft - sections[0].offsetLeft
          : container.clientWidth;

      const EPS = 0.5;
      const cur = Math.round((container.scrollLeft + EPS) / Math.max(1, step));

      if (cur === total - 1) {
        // head clone → first real
        indexRef.current = 1;
        setIndex(1);
        goToIndex(1, "auto");
        return;
      }
      if (cur === 0) {
        // tail clone → last real
        const lastReal = total - 2;
        indexRef.current = lastReal;
        setIndex(lastReal);
        goToIndex(lastReal, "auto");
        return;
      }

      if (cur !== indexRef.current) {
        indexRef.current = cur;
        setIndex(cur);
      }
    };

    const ro = new ResizeObserver(() => goToIndex(indexRef.current, "auto"));

    container.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(container);
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [ready, getEls, goToIndex]);

  useEffect(() => {
    if (!ready) return;
    const { container } = getEls();
    if (!container) return;

    const THRESH = 10;
    const COOLDOWN = 450;
    let cooling = false;

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const dx = e.deltaMode === 1 ? e.deltaX * 16 : e.deltaX;
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;

      if (isJumping.current || Math.abs(delta) < THRESH) return;

      e.preventDefault();
      if (cooling) return;

      cooling = true;
      cancelAnim();
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      goToIndex(indexRef.current + dir, "smooth");

      window.setTimeout(() => (cooling = false), COOLDOWN);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [ready, getEls, cancelAnim, goToIndex]);

  useEffect(() => {
    if (!ready) return;
    const { container } = getEls();
    if (!container) return;

    let startX = 0,
      lastX = 0,
      startT = 0,
      dragging = false;

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
      const dx = lastX - startX;
      const dt = Math.max(1, performance.now() - startT);
      const vel = Math.abs(dx) / dt;
      if (Math.abs(dx) > SWIPE_PX || vel > SWIPE_VEL) {
        const dir: 1 | -1 = dx < 0 ? 1 : -1;
        goToIndex(indexRef.current + dir, "smooth");
      } else {
        goToIndex(indexRef.current, "smooth");
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, [ready, getEls, goToIndex, cancelAnim]);

  const realCount = useMemo(() => {
    if (!ready) return 0;

    const { sections } = getEls();
    return Math.max(0, sections.length - 2);
  }, [getEls, ready]);

  return { index, goToIndex, realCount, ready };
}
