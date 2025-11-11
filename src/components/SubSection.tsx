import { ArrowRight } from 'lucide-react'
import { InViewTransition } from './motion/InViewAnimation'
import { Text } from './ui/Text'

interface Props {
  title: string
  description: string
  ref?: React.RefObject<HTMLDivElement | null>
}

export const SubSection = ({ title, description, ref }: Props) => {
  return (
    <div
      ref={ref}
      className="w-full h-screen gap-20 shrink-0 flex flex-col items-center justify-center"
    >
      <InViewTransition>
        <Text variant="hero" color="primary">
          {title}
        </Text>

        <Text
          variant="h1"
          intent="link"
          color="primary"
          className="inline-flex items-center gap-2 text-lg font-medium"
        >
          <a href="#projects" className="group">
            {description}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Text>
      </InViewTransition>
    </div>
  )
}
