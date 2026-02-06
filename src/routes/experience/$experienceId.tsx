import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ExperienceData } from '@/lib/types/experience'
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
  return <ExperienceLayout data={experience} />
}
