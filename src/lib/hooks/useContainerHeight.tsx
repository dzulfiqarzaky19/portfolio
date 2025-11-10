import { useMemo, useRef } from 'react'

export const useContainerHeight = (slides: number) => {
  const containerChildRef = useRef<HTMLDivElement>(null)

  const size = useMemo(
    () => containerChildRef.current?.getBoundingClientRect(),
    [],
  )

  const containerHeight = useMemo(
    () => Math.max(slides, 1) * (size?.height || window.innerHeight || 0),
    [slides, size?.height],
  )

  return {
    containerChildRef,
    containerHeight,
  }
}
