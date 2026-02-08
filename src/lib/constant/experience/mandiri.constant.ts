import {
  BarChart,
  Globe,
  Handshake,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import type { ExperienceData } from '@/lib/types/experience'

export const MANDIRI: ExperienceData = {
  id: 'mandiri',
  company: {
    name: 'Bank Mandiri',
    logo: '/images/mandiri-logo.webp',
    industry: 'Banking & Financial Services',
    mission:
      'To provide innovative financial solutions and strengthen digital transformation for B2B clients.',
    scale:
      'Serving millions of customers nationwide, with Kopra as its B2B transaction platform.',
    about:
      'Indonesia’s largest bank, offering financial services across retail, corporate, and digital banking.',
    website: 'https://www.bankmandiri.co.id/',
  },
  role: {
    title: 'Frontend Engineer',
    type: 'Contract',
    description:
      'Built custom dashboards and visualization tools for B2B clients, collaborating closely with backend teams to align API contracts.',
    image: '/images/mandiri-kopra.webp',
    focus: [
      'B2B Transaction Dashboards',
      'Data Visualization',
      'API Contract Alignment',
    ],
  },
  technicalContributions: [
    {
      title: 'Canvas-based Charts',
      description:
        'Built customized canvas-based charts for transaction dashboards (finance formatting, tooltips, legends).',
      icon: BarChart,
    },
    {
      title: 'Ops Dashboards',
      description:
        'Integrated maps and composed Ant Design dashboards for internal operations teams.',
      icon: LayoutDashboard,
    },
    {
      title: 'API Alignment',
      description:
        'Partnered with backend engineers to define and consume APIs without reliable Swagger, aligning contracts via test payloads.',
      icon: Handshake,
    },
  ],
  businessImpact: [
    {
      title: 'Reliable Operations',
      metric: 'Internal Ops',
      description:
        'Delivered reliable dashboards for internal ops teams, improving transaction visibility.',
      image: '/images/experience/mandiri/ops.png',
    },
    {
      title: 'Data Visualization',
      metric: 'Custom Charts',
      description:
        'Enhanced data visualization with custom charts tailored to financial reporting needs.',
      image: '/images/experience/mandiri/charts.png',
    },
    {
      title: 'Team Collaboration',
      metric: 'Access & Contracts',
      description:
        'Strengthened collaboration between frontend and backend teams in a complex enterprise environment.',
      image: '/images/experience/mandiri/collab.png',
    },
  ],
  keyTakeaways: [
    {
      title: 'Enterprise FinTech',
      description:
        'Gained insight into strict security and data handling requirements in banking.',
      icon: ShieldCheck,
    },
    {
      title: 'Custom Viz',
      description:
        'Advanced skills in creating bespoke data visualizations beyond standard libraries.',
      icon: TrendingUp,
    },
    {
      title: 'Cross-functional',
      description:
        'Learned to navigate and align with diverse teams in a large corporate structure.',
      icon: Globe,
    },
  ],
  theme: {
    primary: '#003D79',
    gradient: 'linear-gradient(90deg, #FFB700 0%, #003D79 100%)', // Gold to Blue
  },
  cardImage: '/images/mandiri-kopra.webp',
  codeLanguage: 'JavaScript',
  codeSnippet: `
export const TransactionChart = ({ data, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data:[{
          label: 'Volume (IDR)',
          data: data.map(d => d.amount),
          borderColor: color || '#003D79',
          fill: true
        }],
    });

    return () => chart.destroy();
  }, [data, color]);

  return <canvas ref={canvasRef} />;
};`,
}
