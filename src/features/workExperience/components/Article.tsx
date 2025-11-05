import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'
import type { Experience } from '@/lib/constant/experience.constant'
import type { Variants } from 'motion'
import { MotionDeviceFrame } from '@/components/DeviceFrame'
import { MotionText } from '@/components/ui/Text'
import { cn } from '@/lib/cn'

type Props = {
  experience: Partial<Experience>
  i: number
}

const containerIntro: Variants = {
  offscreen: {},
  onscreen: {
    transition: { staggerChildren: 0 },
  },
}

const introVariants: Variants = {
  offscreen: () => ({
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  }),
  onscreen: (idx: number) => ({
    opacity: 1,
    transition: {
      type: 'tween',
      duration: idx * 0.2 || 0.4,
      delay: 0.1,
    },
  }),
}

export const Article = ({ experience, i }: Props) => {
  const AlignmentClassWrapper = useMemo(
    () =>
      i % 2 === 0 ? `self-center lg:self-end` : `self-center lg:self-start`,
    [i],
  )

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
        <motion.div
          className={cn(
            `w-full lg:w-1/2 flex flex-col gap-4`,
            i % 2 === 0 ? `justify-end` : `justify-start`,
          )}
          variants={containerIntro}
          initial="offscreen"
          whileInView="onscreen"
          exit="offscreen"
          viewport={{ once: false, amount: 0.35 }}
        >
          <div className={`flex flex-row ${AlignmentClassWrapper}`}>
            {experience.title?.split('').map((titleChar, index) => (
              <MotionText
                variant="display"
                variants={introVariants}
                custom={index}
                color="surface"
              >
                {titleChar}
              </MotionText>
            ))}
          </div>

          <div className={`flex flex-row ${AlignmentClassWrapper}`}>
            {`${experience.role}`.split('').map((subTitleChar, index) => (
              <MotionText
                variant="h3"
                variants={introVariants}
                custom={index}
                color="surface"
              >
                {subTitleChar}
              </MotionText>
            ))}
          </div>

          <div className={`${AlignmentClassWrapper}`}>
            {experience.highlight?.map((highlight) => (
              <MotionText
                variant="lead"
                variants={introVariants}
                color="surface"
              >
                {highlight}
              </MotionText>
            ))}
          </div>

          <motion.button
            layout
            whileHover={{
              scale: 1.1,
              transition: {
                type: 'tween',
                duration: 0.4,
                delay: 0.1,
              },
            }}
            className={`border border-amber-400 p-2 w-2xs ${AlignmentClassWrapper}`}
          >
            <MotionText>Learn more</MotionText>
          </motion.button>
        </motion.div>

        <div className="w-full lg:w-1/2">
          <MotionDeviceFrame
            transition={{
              type: 'tween',
              delay: 1,
            }}
          >
            <motion.img
              variants={introVariants}
              initial="offscreen"
              whileInView="onscreen"
              src={experience.imgUrl}
              alt={`${experience.title} mobile app`}
              className="h-full w-full object-top object-cover cursor-pointer"
              loading="lazy"
            />
          </MotionDeviceFrame>
        </div>
      </article>
    </AnimatePresence>
  )
}
