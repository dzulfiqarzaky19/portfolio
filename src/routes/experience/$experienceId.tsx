import { createFileRoute, notFound } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import type { ExperienceData } from '@/lib/types/experience'
import { PageTransition } from '@/components/motion/animations/PageTransition'
import { ExperienceLayout } from '@/features/experience/ExperienceLayout'
import { EXPERIENCE_DETAILS } from '@/lib/constant/experience'

export const Route = createFileRoute('/experience/$experienceId')({
  component: ExperienceRoute,
  loader: ({ params }) => {
    const experience = EXPERIENCE_DETAILS[params.experienceId] as
      | ExperienceData
      | undefined

    if (!experience) {
      throw notFound()
    }

    return experience
  },
})

function ExperienceRoute() {
  const experience = Route.useLoaderData()
  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={experience.id}
            className="absolute inset-0 h-full w-full"
            style={{ background: experience.theme.gradient || 'hsl(var(--surface-1))' }}
            transition={{ 
              duration: 0.5, 
              ease: [0.7, 0.3, 0.3, 0.7] 
            }}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <PageTransition key={experience.id}>
          <ExperienceLayout data={experience} />
        </PageTransition>
      </AnimatePresence>
    </>
  )
}
