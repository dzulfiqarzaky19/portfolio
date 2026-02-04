import { createFileRoute } from '@tanstack/react-router'
import { HomeLayout } from '@/features/home/HomeLayout'
import Hero from '@/features/home/hero/Hero'
import Project from '@/features/home/project/Project'
import { ContactMe } from '@/features/home/contactMe/ContactMe'
import { WorkExperience } from '@/features/home/workExperience/WorkExperience'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <HomeLayout>
      <Hero />

      <Project />

      <WorkExperience />

      <ContactMe />
    </HomeLayout>
  )
}
