// useSectionPager.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Options = {
  containerId?: string;
  sectionSelector?: string;
  cooldownMs?: number;
  threshold?: number;
  infinite?: boolean; // wheel/keys logical loop
  loopSeamless?: boolean; // clone-based seamless loop
  mobileBreakpoint?: number;
  enableControls?: boolean;
};

export function useSectionPager({
  containerId = "mainContainer",
  sectionSelector = ".section",
  cooldownMs = 650,
  threshold = 10,
  infinite = true,
  loopSeamless = false,
  mobileBreakpoint = 768,
  enableControls = true,
}: Options = {}) {
  const [index, setIndex] = useState(0);
  const busy = useRef(false);
  const indexRef = useRef(0);

  const getEls = useCallback(() => {
    const container = document.getElementById(containerId);
    const sections = container
      ? Array.from(container.querySelectorAll<HTMLElement>(sectionSelector))
      : [];
    return { container, sections };
  }, [containerId, sectionSelector]);

  const isMobile = useCallback(
    () => window.innerWidth <= mobileBreakpoint,
    [mobileBreakpoint]
  );

  const realCount = useCallback(() => {
    const { sections } = getEls();
    // when using clones: total = N + 2
    return loopSeamless ? Math.max(0, sections.length - 2) : sections.length;
  }, [getEls, loopSeamless]);

  const goToIndex = useCallback(
    (rawIdx: number, behavior: ScrollBehavior = "smooth") => {
      const { container, sections } = getEls();
      if (!container || sections.length === 0) return;

      const total = sections.length;
      let idx = rawIdx;

      if (loopSeamless) {
        // allow targeting 0..total-1 (includes clones)
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
      const left = target.offsetLeft;
      const top = target.offsetTop;

      container.scrollTo(
        isMobile()
          ? ({ top, behavior } as ScrollToOptions)
          : ({ left, behavior } as ScrollToOptions)
      );
    },
    [getEls, infinite, isMobile, loopSeamless]
  );

  // Sync and seamless jump when hitting clones
  useEffect(() => {
    const { container, sections } = getEls();
    if (!container || sections.length === 0) return;

    const total = sections.length;
    const lastReal = loopSeamless ? total - 2 : total - 1;

    let jumpTimer: number | undefined;

    const onScroll = () => {
      const size = isMobile() ? window.innerHeight : window.innerWidth;
      const pos = isMobile() ? container.scrollTop : container.scrollLeft;
      const cur = Math.round(pos / Math.max(1, size));

      // Seamless wrap handling
      if (loopSeamless) {
        // If on head clone (last index), jump to real first (1)
        if (cur === total - 1) {
          setIndex(1); // logical active for dots (first real)
          indexRef.current = total - 1;
          window.clearTimeout(jumpTimer);
          jumpTimer = window.setTimeout(() => goToIndex(1, "auto"), 40);
          return;
        }
        // If on tail clone (0), jump to real last (lastReal)
        if (cur === 0) {
          setIndex(lastReal); // logical active for dots (last real)
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
  }, [getEls, goToIndex, isMobile, loopSeamless]);

  useEffect(() => {
    if (!enableControls) return;
    const { container, sections } = getEls();
    if (!container || sections.length === 0) return;

    let cooldownTimer: number | undefined;
    const trigger = (dir: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      const next = indexRef.current + dir;
      goToIndex(next);
      window.clearTimeout(cooldownTimer);
      cooldownTimer = window.setTimeout(
        () => (busy.current = false),
        cooldownMs
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (isMobile()) return;
      if (Math.abs(e.deltaY) < threshold) return;
      e.preventDefault();
      trigger(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isMobile()) return;
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
  }, [enableControls, getEls, goToIndex, isMobile, cooldownMs, threshold]);

  return useMemo(
    () => ({ index, goToIndex, realCount: realCount() }),
    [index, goToIndex, realCount]
  );
}
