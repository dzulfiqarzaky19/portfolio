export interface Experience {
  title: string
  role?: string
  color?: string
  imgUrl?: string
  time: string
  stacks: Array<string>
  highlight: Array<string>
  description?: string
  detailUrl:
  | '/experience/raiz'
  | '/experience/edot'
  | '/experience/mandiri'
  | '/experience/consistech'
}

export const RAIZ: Experience = {
  title: 'Raiz Invest',
  role: 'Frontend Engineer',
  time: 'Jul 2023 - Aug 2025',
  color: 'linear-gradient(116.57deg, #63de76, #29ae87)',
  imgUrl: '/images/raiz.webp',
  detailUrl: '/experience/raiz',
  highlight: [
    'Rebuilt a cross-browser extension into React and TypeScript (Chrome, Firefox, Safari).',
    'Co-delivered CRA to Vite and Bumped React 16.x to 18.x on CI server, achieving faster and stable builds.',
  ],
  stacks: [
    'React',
    'TypeScript',
    'Redux',
    'Vitest/RTL',
    'GraphQL',
    'Next.js',
    'Contentful',
  ],
}

export const EDOT: Experience = {
  title: 'Nabati Group',
  role: 'Frontend Engineer',
  time: 'Sep 2022 – Jun 2023',
  color: '#D32422',
  imgUrl: '/images/edot.webp',
  detailUrl: '/experience/edot',
  stacks: [
    'Next.js',
    'TypeScript',
    'Ant Design',
    'styled-components',
    'Mapbox',
    'Google Maps',
  ],
  highlight: [
    'Built multi-role dashboards (admin, partner, staff) with route/feature guards.',
    'Migrated maps from Google Maps to Mapbox to cut API costs and enable shipment tracking.',
  ],
}

export const MANDIRI: Experience = {
  title: 'Bank Mandiri',
  role: 'Frontend Developer',
  time: 'Apr – Aug 2022',
  color: '#0064b9',
  imgUrl: '/images/mandiri-kopra.webp',
  detailUrl: '/experience/mandiri',
  stacks: ['React', 'Ant Design', 'Canvas Charts', 'Maps'],
  highlight: [
    'Built custom canvas-based charts for B2B transaction dashboards.',
    'Integrated maps and composed Ant Design dashboards.',
  ],
}

export const CONSISTECH: Experience = {
  title: 'Consistech Solution',
  role: 'Junior Full-Stack',
  time: 'Sep 2019 – Nov 2021',
  stacks: ['React', 'Vue', 'Node.js'],
  color: '#714B67',
  imgUrl: '/images/consistech.webp',
  detailUrl: '/experience/consistech',
  highlight: [
    'Delivered client projects across ERP, Hospital Information System, and Payroll.',
    'shipped full-stack features.',
  ],
}

export const EXPERIENCE_HEADER: Partial<Experience> = {
  title: 'Work Experience ?',
  description: `Let's Go`,
}
export const EXPERIENCE = [EXPERIENCE_HEADER, RAIZ, EDOT, MANDIRI, CONSISTECH]
