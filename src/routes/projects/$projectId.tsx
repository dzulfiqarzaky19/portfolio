import { createFileRoute, notFound } from '@tanstack/react-router'
import { PROJECT_DETAILS } from '@/lib/constant/projects'
import { ProjectLayout } from '@/features/projects/ProjectLayout'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectRoute,
  loader: ({ params }) => {
    const project = PROJECT_DETAILS[params.projectId]

    if (!project) {
      throw notFound()
    }
    return project
  },
})

function ProjectRoute() {
  const project = Route.useLoaderData()
  return <ProjectLayout project={project} />
}
