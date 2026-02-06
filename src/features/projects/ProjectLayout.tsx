import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { ProjectFooter } from './components/ProjectFooter.tsx'
import { ProjectHero } from './components/ProjectHero.tsx'
import { ProjectSection } from './components/ProjectSection.tsx'
import { VerticalProgress } from './components/VerticalProgress.tsx'
import type { ProjectData } from '@/lib/types/project'

interface ProjectLayoutProps {
  project: ProjectData
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({ project }) => {
  return (
    <div className="relative min-h-screen bg-[hsl(var(--surface-1))] text-[hsl(var(--ink))]">
      <VerticalProgress sections={project.sections} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <Link
          to="/"
          className="absolute top-8 left-6 lg:left-8 z-10 flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted))] hover:text-[hsl(var(--primary))] transition-colors max-w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <ProjectHero
          tag={project.tag}
          title={project.title}
          subtitle={project.subtitle}
          links={project.links}
        />

        <div className="space-y-32 py-24">
          {project.sections.map((section, index) => (
            <ProjectSection key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>

      <ProjectFooter currentProjectId={project.id} />
    </div>
  )
}
