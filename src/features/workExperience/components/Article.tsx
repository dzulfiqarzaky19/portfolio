import { AnimatePresence } from 'motion/react'
import type { Experience } from '@/lib/constant/experience.constant'
import { MotionDeviceFrame } from '@/components/DeviceFrame'
import { cn } from '@/lib/cn'
import { TextWithIntro } from '@/components/motion/TextWithIntro'

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
            i % 2 === 0 ? `justify-end` : `justify-start`,
          )}
        >
          <TextWithIntro variant="display" color="surface">
            {experience.title}
          </TextWithIntro>

          <TextWithIntro variant="h3" color="surface">
            {experience.role}
          </TextWithIntro>

          <TextWithIntro variant="lead" color="surface">
            {experience.highlight}
          </TextWithIntro>

          <button
            className={`border border-amber-400 p-2 w-2xs ${i % 2 === 0 ? 'self-center lg:self-end' : 'self-center lg:self-start'}`}
          >
            <TextWithIntro>Learn more</TextWithIntro>
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <MotionDeviceFrame
            transition={{
              type: 'tween',
              delay: 1,
            }}
          >
            <img
              src={experience.imgUrl}
              alt={`${experience.title} mobile app`}
              className="h-full w-full object-top object-cover cursor-pointer "
              loading="lazy"
            />
          </MotionDeviceFrame>
        </div>
      </article>
    </AnimatePresence>
  )
}
