// Layout.tsx
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { NavDots } from "../components/NavDots";
import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { RouteCurtain } from "../components/animation/RouteTransition";
import { TransitionOverlay } from "../components/animation/TransitionOverlay";

export default function Layout() {
  const mainRef = React.useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [isOverlayActive, setIsOverlayActive] = React.useState(false);
  const [targetPath, setTargetPath] = React.useState<string | null>(null);

  const [displayedLocation, setDisplayedLocation] = React.useState(location);

  React.useEffect(() => {
    if (!isOverlayActive && !targetPath) {
      const id = requestAnimationFrame(() => {
        mainRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.pathname, isOverlayActive, targetPath]);

  const handleNavigateWithTransition = React.useCallback(
    (path: string) => {
      if (location.pathname === path) return;

      setTargetPath(path);
      setIsOverlayActive(true);
    },
    [location.pathname]
  );

  const onOverlayFullyIn = React.useCallback(() => {
    if (targetPath) {
      if (location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [targetPath, navigate, location.pathname]);

  const onNewPageReadyToReveal = React.useCallback(() => {
    setIsOverlayActive(false);
  }, []);

  const onOverlayFullyOut = React.useCallback(() => {
    setTargetPath(null);
  }, []);

  React.useEffect(() => {
    if (!isOverlayActive && location.pathname !== displayedLocation.pathname) {
      setDisplayedLocation(location);
    }
  }, [location, isOverlayActive, displayedLocation]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:p-3 focus:bg-black/80 focus:text-white rounded"
      >
        Skip to content
      </a>

      <TransitionOverlay
        isVisible={isOverlayActive}
        onOverlayFullyIn={onOverlayFullyIn}
        onOverlayFullyOut={onOverlayFullyOut}
      />

      <div
        id="pageScroll"
        className={`main-content-wrapper ${
          location.pathname !== "/" ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <RouteCurtain
            key={displayedLocation.key}
            location={displayedLocation}
            onPageReady={onNewPageReadyToReveal}
          />
        </AnimatePresence>
      </div>
      <ScrollRestoration />

      {isHome && <Header onNavigate={handleNavigateWithTransition} />}

      {isHome && <NavDots />}
    </>
  );
}
