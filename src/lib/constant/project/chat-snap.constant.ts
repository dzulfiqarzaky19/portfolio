import type { ProjectData } from '../../types/project'

export const CHAT_SNAP_PROJECT: ProjectData = {
  id: 'chat-snap',
  tag: 'FULLSTACK APP',
  title: 'Chat Snap',
  subtitle:
    'A real-time chat application with many-to-many relationships and complex moderation features.',
  description:
    'A real-time chat application with many-to-many relationships and complex moderation features.',
  links: [
    {
      url: 'https://github.com/dzulfiqarzaky/chat-snap',
      label: 'View Source Code',
      icon: 'github',
    },
    {
      url: 'https://chat-snap-demo.com',
      label: 'Live Demo',
      icon: 'live',
    },
  ],
  sections: [], // Placeholder
  theme: {
    primary: '#EC4899',
    gradient: 'linear-gradient(135deg, #831843 0%, #be185d 100%)',
  },
}
