// motion/Intro.tsx
import { motion } from 'motion/react'
import type { Variants } from 'motion'

export const staggerParent: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.06,
    },
  },
}

export const fadeInItem: Variants = {
  offscreen: {
    opacity: 0,
    y: 12,
    transition: { type: 'tween', duration: 0.28 },
  },
  onscreen: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.28 } },
}

export const Intro = {
  Stagger: (props: React.ComponentProps<typeof motion.div>) => (
    <motion.div
      variants={staggerParent}
      initial="offscreen"
      whileInView="onscreen"
      exit="offscreen"
      viewport={{ once: false, amount: 0.35 }}
      {...props}
    />
  ),
  Item: (props: React.ComponentProps<typeof motion.div>) => (
    <motion.div variants={fadeInItem} {...props} />
  ),
}
