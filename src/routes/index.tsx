import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/Layout'
import { WorkExperience } from '@/features/workExperience/WorkExperience'
import Hero from '@/features/hero/Hero'
import Project from '@/features/project/Project'
import { ContactMe } from '@/features/contactMe/ContactMe'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Layout>
      <Hero />

      <Project />

      <WorkExperience />

      <ContactMe />
    </Layout>
  )
}
