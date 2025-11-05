import { useMemo, useRef } from 'react'

export const useContainerHeight = (slides: number) => {
  const childrenRef = useRef<HTMLDivElement>(null)

  const size = useMemo(() => childrenRef.current?.getBoundingClientRect(), [])

  const containerHeight = useMemo(
    () => Math.max(slides, 1) * (size?.height || window.innerHeight || 0),
    [slides, size?.height],
  )

  return {
    childrenRef,
    containerHeight,
  }
}
