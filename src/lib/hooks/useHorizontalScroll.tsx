import { useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

interface IUseHorizontalScroll {
  from?: Array<number>
  to?: Array<string>
}

export const useHorizontalScroll = ({
  from = [0, 1],
  to = ['0%', '-100%'],
}: IUseHorizontalScroll) => {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ['start start', 'end end'],
  })

  const dampenedYscroll = useSpring(scrollYProgress, {
    bounce: 0,
    damping: 40,
    mass: 0.8,
  })

  const x = useTransform(dampenedYscroll, from, to)

  return {
    scrollerRef,
    x,
  }
}
