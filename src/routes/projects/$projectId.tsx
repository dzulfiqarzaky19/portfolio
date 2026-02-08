import { createFileRoute, notFound } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { PROJECT_DETAILS } from '@/lib/constant/projects'
import { ProjectLayout } from '@/features/projects/ProjectLayout'
import { PageTransition } from '@/components/motion/animations/PageTransition'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectRoute,
  loader: ({ params }) => {
    const project = PROJECT_DETAILS[params.projectId]

    if (!Object.keys(PROJECT_DETAILS).includes(params.projectId)) {
      throw notFound()
    }
    return project
  },
})

function ProjectRoute() {
  const project = Route.useLoaderData()
  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="absolute inset-0 h-full w-full"
            style={{ background: project.theme.gradient || 'hsl(var(--surface-1))' }}
            transition={{ 
              duration: 1, 
              ease: [0.4, 0, 0.2, 1] 
            }}
          />
        </AnimatePresence>
      </div>

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <PageTransition key={project.id} duration={0.3}>
          <ProjectLayout project={project} />
        </PageTransition>
      </AnimatePresence>
    </>
  )
}
