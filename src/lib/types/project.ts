export interface ProjectSection {
  id: string
  type:
    | 'challenge'
    | 'folder-structure'
    | 'caching'
    | 'metrics'
    | 'lessons'
    | 'cta'
    | 'flow'
  number?: string
  heading: string
  description?: string
  image?: string
  codeSnippet?: string
  imageAlt?: string
  isTilted?: boolean
  content?: any // Specific content for different section types
}

export interface ProjectData {
  id: string
  title: string
  subtitle: string
  description: string
  tag: string
  links?: Array<{
    url: string
    label: string
    icon?: 'github' | 'live' | 'other'
  }>
  theme: {
    primary: string
    gradient: string
  }
  sections: Array<ProjectSection>
}
