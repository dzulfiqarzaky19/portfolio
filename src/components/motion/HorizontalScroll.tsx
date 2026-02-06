import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useContainerHeight } from '@/lib/hooks/useContainerHeight'
import { useHorizontalScroll } from '@/lib/hooks/useHorizontalScroll'
import { cn } from '@/lib/cn'

interface IHorizontalScrollProps {
  slides: number
  children: Iterable<ReactNode>
}

export const HorizontalScroll = ({
  slides,
  children,
}: IHorizontalScrollProps) => {
  const { containerChildRef, containerHeight } = useContainerHeight(slides)
  const [isDesktop, setIsDesktop] = useState(true) // Default to true or check window

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lastSlides = Math.max(slides - 1, 0) * 100

  const { scrollerRef, x } = useHorizontalScroll({
    to: ['0%', `-${lastSlides}%`],
  })

  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      ref={scrollerRef}
      style={{
        height: isDesktop ? `${containerHeight}px` : 'auto',
      }}
    >
      <div
        ref={containerChildRef}
        className={cn(
          'overflow-x-hidden',
          isDesktop ? 'sticky top-0' : 'relative',
        )}
      >
        <motion.div
          className={cn('flex', isDesktop ? 'flex-row' : 'flex-col')}
          style={{ x: isDesktop ? x : 0 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
