export interface ProjectSectionContent {
  highlight?: { title: string; message: string }
  bullets?: Array<{ title: string; message: string }>
  highlights?: Array<{ type: string; message: string }>
  items?: Array<{ title: string; message: string }>
  cards?: Array<{ title: string; description: string; image?: string }>
  steps?: Array<{ title: string; description: string }>
}

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
  content?: ProjectSectionContent
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
