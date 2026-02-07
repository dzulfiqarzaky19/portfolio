import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { wrap } from 'motion'
import type { PanInfo } from 'motion/react'
import { cn } from '@/lib/cn'

interface SwipeNavigatorProps<T> {
  items: Array<T>
  direction: 'x' | 'y'
  visibleRange?: number
  threshold?: number
  dragElastic?: number
  className?: string
  itemLabel?: string
  getItemName?: (item: T) => string
  renderItem: (props: {
    item: T
    index: number
    offset: number
    isCenter: boolean
    isMobile: boolean
  }) => React.ReactNode
}

export function SwipeNavigator<T>({
  items,
  direction,
  visibleRange = 1,
  threshold = 50,
  dragElastic = 0.2,
  className,
  itemLabel = 'item',
  getItemName,
  renderItem,
}: SwipeNavigatorProps<T>) {
  const total = items.length
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextItem = () => setIndex((prev) => prev + 1)
  const prevItem = () => setIndex((prev) => prev - 1)

  const virtualIndex = wrap(0, total, index)
  const isMobile = width < 768
  const isHorizontal = direction === 'x'

  const dragConstraints = isHorizontal
    ? { left: 0, right: 0 }
    : { top: 0, bottom: 0 }

  const handleDragEnd = (_: unknown, { offset }: PanInfo) => {
    const swipe = isHorizontal ? offset.x : offset.y

    if (swipe < -threshold) {
      nextItem()
    } else if (swipe > threshold) {
      prevItem()
    }
  }

  const prevItemName = getItemName?.(items[(virtualIndex - 1 + total) % total])
  const nextItemName = getItemName?.(items[(virtualIndex + 1) % total])

  return (
    <>
      <motion.div
        className={cn(
          'cursor-grab active:cursor-grabbing touch-none',
          className,
        )}
        drag={direction}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => {
            const offset = wrap(-1, total - 1, i - virtualIndex)
            const isInsideWindow = Math.abs(offset) <= visibleRange

            if (!isInsideWindow) return null

            const isCenter = offset === 0

            return renderItem({
              item,
              index: i,
              offset,
              isCenter,
              isMobile,
            })
          })}
        </AnimatePresence>
      </motion.div>

      <div
        className={cn(
          'absolute z-50 flex items-center',
          isHorizontal
            ? 'bottom-12 left-1/2 -translate-x-1/2 flex-row gap-12'
            : 'bottom-8 left-1/2 -translate-x-1/2 flex-row gap-6 md:top-1/2 md:right-12 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0 md:flex-col',
        )}
      >
        <button
          onClick={prevItem}
          aria-label={`View previous ${itemLabel}: ${prevItemName || 'None'}`}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer"
        >
          <span className={cn(!isHorizontal && 'md:rotate-0 -rotate-90')}>
            {isHorizontal ? '←' : '↑'}
          </span>
        </button>

        <div
          className={cn(
            'flex gap-2',
            isHorizontal ? 'flex-row' : 'flex-row md:flex-col',
          )}
        >
          {items.map((_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                isHorizontal
                  ? cn(
                      'w-2 h-2',
                      i === virtualIndex ? 'w-8 bg-white' : 'bg-white/30',
                    )
                  : cn(
                      'w-1.5 h-1.5 md:w-2 md:h-2',
                      i === virtualIndex
                        ? 'w-6 md:w-2 md:h-8 bg-white'
                        : 'bg-white/30',
                    ),
              )}
            />
          ))}
        </div>

        <button
          onClick={nextItem}
          aria-label={`View next ${itemLabel}: ${nextItemName || 'None'}`}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer"
        >
          <span className={cn(!isHorizontal && 'md:rotate-0 -rotate-90')}>
            {isHorizontal ? '→' : '↓'}
          </span>
        </button>
      </div>
    </>
  )
}
