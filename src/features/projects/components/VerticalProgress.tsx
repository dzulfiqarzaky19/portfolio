import { motion, useScroll, useSpring } from 'motion/react'

export const VerticalProgress = () => {
  const { scrollYProgress } = useScroll()
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none z-0 hidden lg:block">
      <div className="absolute inset-y-0 w-px bg-[hsl(var(--border)/0.5)]" />

      <motion.div
        className="absolute top-0 w-px bg-[hsl(var(--primary))] origin-top"
        style={{ scaleY: lineScale, height: '100%' }}
      />
    </div>
  )
}
