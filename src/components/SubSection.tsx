import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import type { Variants } from 'motion'
import { MotionText, Text } from '@/components/ui/Text'
import { MotionSubSection } from '@/components/SubSection'

interface Props {
  title: string
  description: string
  ref?: React.RefObject<HTMLDivElement | null>
}

export const motionSubSection: Variants = {
  offscreen: {
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
  },
}

export const subSectionKey = {
  offscreen: 'offscreen',
  onscreen: 'onscreen',
} as const

export const SubSection = ({ title, description, ref }: Props) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen gap-20 shrink-0 flex flex-col items-center justify-center"
    >
      <MotionText
        variant="hero"
        color="primary"
        variants={MotionSubSection}
        initial={subSectionKey.offscreen}
        whileInView={subSectionKey.onscreen}
        exit={subSectionKey.offscreen}
      >
        {title}
      </MotionText>

      <MotionText
        asChild
        variant="h1"
        intent="link"
        color="primary"
        className="inline-flex items-center gap-2 text-lg font-medium"
      >
        <a href="#projects" className="group">
          {description}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </MotionText>
    </div>
  )
}
