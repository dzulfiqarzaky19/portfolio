import type { ProjectData } from '../../types/project'

export const PORTFOLIO_PROJECT: ProjectData = {
  id: 'portfolio',
  tag: 'CREATIVE ENGINEERING',
  title: 'Aesthetic Portfolio v2',
  subtitle:
    'Blending performance with high-end aesthetics. A showcase of modern web capabilities.',
  description:
    'Blending performance with high-end aesthetics. A showcase of modern web capabilities.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky/portfolio',
      label: 'View Source Code',
      icon: 'github',
    },
    {
      url: 'https://dzulfiqar.dev',
      label: 'Live Demo',
      icon: 'live',
    },
  ],
  sections: [], // Placeholder
  theme: {
    primary: '#10B981',
    gradient: 'linear-gradient(90deg, #064e3b 0%, #059669 100%)',
  },
}
