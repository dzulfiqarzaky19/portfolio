import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SliderCardMotionProps {
  children: ReactNode
  direction: 'x' | 'y'
  offset: number
  isCenter: boolean
  isMobile: boolean
  className?: string
}

export const SliderCardMotion: React.FC<SliderCardMotionProps> = ({
  children,
  direction,
  offset,
  isCenter,
  isMobile,
  className,
}) => {
  const isHorizontal = direction === 'x'

  const baseOffset = isMobile ? (isHorizontal ? 60 : 100) : isHorizontal ? 180 : 150
  const position = offset * baseOffset

  const scale = isCenter
    ? isHorizontal
      ? 1
      : isMobile
        ? 1
        : 1.25
    : isHorizontal
      ? 0.85
      : isMobile
        ? 0.9
        : 1

  const opacity = isCenter ? 1 : isHorizontal ? 0.9 : 0.4
  const z = isCenter ? 30 : 10
  const rotation = offset * (isHorizontal ? 5 : -10)

  const animateProps = isHorizontal
    ? { x: position, rotateY: rotation }
    : { y: position, rotateX: rotation }

  const initialProps = isHorizontal
    ? { x: position * 1.5 }
    : { y: position * 1.5 }

  const exitProps = isHorizontal
    ? { x: -position }
    : { y: -position }

  return (
    <motion.div
      className={cn(
        'absolute flex items-center justify-center w-full',
        isHorizontal ? 'max-w-[90%] md:max-w-3xl' : 'px-4 md:px-0 max-w-[90%] md:max-w-4xl',
        className,
      )}
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.8, ...initialProps }}
      animate={{
        scale,
        opacity,
        filter: 'blur(0px)',
        ...animateProps,
      }}
      exit={{ opacity: 0, scale: 0.5, ...exitProps }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  )
}
