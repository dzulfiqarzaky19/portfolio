import { useEffect } from "react";

export const useHorizontalWheel = (containerId = "mainContainer") => {
  useEffect(() => {
    const el = document.getElementById(containerId);
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) return;

      const canScroll = el.scrollWidth > el.clientWidth;
      if (!canScroll) return;

      e.preventDefault();

      // Scroll horizontally
      el.scrollBy({ left: e.deltaY, behavior: "auto" });

      // Detect bounds for infinite wrap-around
      const nearRightEdge =
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      const nearLeftEdge = el.scrollLeft <= 0;

      if (nearRightEdge && e.deltaY > 0) {
        // if scrolling right at the end → jump to start
        el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
      } else if (nearLeftEdge && e.deltaY < 0) {
        // if scrolling left at the start → jump to end
        el.scrollTo({
          left: el.scrollWidth - el.clientWidth,
          behavior: "instant" as ScrollBehavior,
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [containerId]);
};
