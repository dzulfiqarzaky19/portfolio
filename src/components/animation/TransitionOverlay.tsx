import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";

const DURATION_OVERLAY = 0.6;
const EASE_OVERLAY: Transition["ease"] = [0.83, 0, 0.17, 1];
const overlayVariants = {
  hidden: { y: "100vh" },
  visible: {
    y: 0,
    transition: { duration: DURATION_OVERLAY, ease: EASE_OVERLAY },
  },
  exit: {
    y: "-100vh",
    transition: { duration: DURATION_OVERLAY, ease: EASE_OVERLAY },
  },
};

interface TransitionOverlayProps {
  isVisible: boolean;
  onOverlayFullyIn?: () => void;
  onOverlayFullyOut?: () => void;
}

const TransitionOverlay = ({
  isVisible,
  onOverlayFullyIn,
  onOverlayFullyOut,
}: TransitionOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="transition-curtain-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationComplete={(definition) => {
            if (definition === "visible" && onOverlayFullyIn) {
              onOverlayFullyIn();
            }
            if (definition === "exit" && onOverlayFullyOut) {
              onOverlayFullyOut();
            }
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "var(--color-bg-dark)",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export { TransitionOverlay };
