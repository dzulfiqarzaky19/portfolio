import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useContainerHeight } from '@/lib/hooks/useContainerHeight'
import { useHorizontalScroll } from '@/lib/hooks/useHorizontalScroll'

interface IHorizontalScrollProps {
  slides: number
  children: Iterable<ReactNode>
}
export const HorizontalScroll = ({
  slides,
  children,
}: IHorizontalScrollProps) => {
  const { containerChildRef, containerHeight } = useContainerHeight(slides)

  const lastSlides = Math.max(slides - 1, 0) * 100

  const { scrollerRef, x } = useHorizontalScroll({
    to: ['0%', `-${lastSlides}%`],
  })

  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      ref={scrollerRef}
      style={{
        height: `${containerHeight}px`,
      }}
    >
      <div ref={containerChildRef} className="sticky top-0 overflow-x-hidden">
        <motion.div className="flex" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
