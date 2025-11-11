import { AnimatePresence } from 'motion/react'
import { Link } from '@tanstack/react-router'
import type { Experience } from '@/lib/constant/experience.constant'
import { DeviceFrame } from '@/components/DeviceFrame'
import { cn } from '@/lib/cn'
import { InViewTransition } from '@/components/motion/InViewAnimation'
import { Text } from '@/components/ui/Text'

type Props = {
  experience: Partial<Experience>
  i: number
}

export const Article = ({ experience, i }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <article
        key={experience.title}
        className={cn(
          'min-w-dvw min-h-dvh flex justify-center items-center flex-col-reverse',
          'gap-16 lg:gap-8',
          'px-6 sm:px-10 lg:px-14',
          i % 2 === 0
            ? 'bg-[hsl(var(--primary))] lg:flex-row lg:text-right'
            : 'bg-[hsl(var(--accent))] lg:flex-row-reverse lg:text-left',
        )}
      >
        <div
          className={cn(
            `w-full lg:w-1/2 flex flex-col gap-4`,
            i % 2 === 0 ? 'lg:items-end' : 'lg:items-start',
          )}
        >
          <InViewTransition>
            <Text variant="display" color="surface">
              {experience.title}
            </Text>

            <Text variant="h3" color="surface">
              {experience.role}
            </Text>

            <Text variant="lead" color="surface">
              {experience.highlight}
            </Text>

            <Link
              to={experience.detailUrl || '/'}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white ring-1 ring-white/20 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--focus))]"
            >
              Learn More
              <span aria-hidden>↗</span>
            </Link>
          </InViewTransition>
        </div>

        <div className="w-full lg:w-1/2">
          <DeviceFrame>
            <img
              src={experience.imgUrl}
              alt={`${experience.title} mobile app`}
              className="h-full w-full object-top object-cover cursor-pointer "
              loading="lazy"
            />
          </DeviceFrame>
        </div>
      </article>
    </AnimatePresence>
  )
}
