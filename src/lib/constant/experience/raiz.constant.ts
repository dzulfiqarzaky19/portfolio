import {
  Blocks,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Rocket,
  TrendingUp,
  Zap,
} from 'lucide-react'
import type { ExperienceData } from '@/lib/types/experience'

export const RAIZ_INVEST: ExperienceData = {
  id: 'raiz',
  company: {
    name: 'Raiz Invest',
    logo: '/images/raiz-logo.webp',
    industry: 'Fintech',
    mission:
      'To make investing simple, affordable, and accessible for everyone.',
    scale:
      'Serving hundreds of thousands of users across multiple regions, managing millions in assets.',
    about: 'Empowering Australians to invest small amounts regularly.',
    website: 'https://raizinvest.com.au/',
  },
  role: {
    title: 'Frontend Engineer',
    type: 'Contract',
    description:
      'Lead the modernization of legacy frontend systems. Focused on migrating a react class components to functional components, enhancing developer velocity and user experience simultaneously.',
    image: '/images/raiz.webp',
    focus: [
      'Lead the development of a cross-browser extension.',
      'Modernized frontend systems',
      'Performance Optimization',
    ],
  },
  technicalContributions: [
    {
      title: 'Cross-browser Extension',
      description:
        'Lead the development of a cross-browser extension that allows users to invest small amounts of money regularly.',
      icon: Blocks,
    },
    {
      title: 'React + TS Rewrite',
      description:
        'Complete migration of critical investment flows from legacy React Class components to React functional components with strict TypeScript typing.',
      icon: Code2,
    },
    {
      title: 'CRA to Vite Migration',
      description:
        'Co-delivered migration from Create React App to Vite, reducing local dev server cost and improving developer experience.',
      icon: Zap,
    },
    {
      title: 'Marketing Site maintenance',
      description:
        'Update marketing site content and SEO using Next.js and GraphQL.',
      icon: Database,
    },
    {
      title: 'Code Quality & Reviews',
      description:
        'Established daily PR review cycles and integrated ESLint/Prettier pipelines to maintain high code standards.',
      icon: CheckCircle2,
    },
  ],
  businessImpact: [
    {
      title: 'Faster Builds',
      metric: '40% less build time',
      description:
        'Improved developer velocity significantly with Vite build configuration.',
      image: '/images/experience/raiz/builds.png',
    },
    {
      title: 'Broader Reach',
      metric: 'Upgrading User Experience',
      description:
        'Cross-browser extension on Safari, Chrome, and Firefox opened the platform to a wider demographic.',
      image: '/images/experience/raiz/a11y.png',
    },
    {
      title: 'Code Quality Metrics',
      metric: 'High',
      description: 'Reduced technical debt and maintained high test coverage.',
      image: '/images/experience/raiz/quality.png',
    },
  ],
  keyTakeaways: [
    {
      title: 'Reduced Tech Debt',
      description:
        'Removing legacy jQuery dependencies and React Class components streamlined the codebase, making future features significantly easier to implement.',
      icon: TrendingUp,
    },
    {
      title: 'Broader Reach',
      description:
        "Cross-browser extension on Safari, Chrome, and Firefox opened the platform to a wider demographic, aligning with the company's mission of making investing simple, affordable, and accessible for everyone.",
      icon: Globe,
    },
    {
      title: 'Improved Velocity',
      description:
        'Modern tooling, refactoring and code review process boosted developer confidence and speed, enabling smoother development and release.',
      icon: Rocket,
    },
  ],
  theme: {
    primary: '#60C0A8', // Raiz green-ish
    gradient: 'linear-gradient(90deg, #1E3A8A 0%, #60C0A8 100%)', // Deep blue to teal
  },
  cardImage: '/images/raiz.webp',
  codeLanguage: 'TypeScript',
  codeSnippet: `// Migration: Class Component -> Functional Component

// ❌ BEFORE (Legacy):
// class InvestmentPortfolio extends React.Component {
//   componentDidMount() {
//     this.props.fetchPortfolio(this.props.userId);
//   }
//   render() {
//     return <div>{this.props.data.balance}</div>;
//   }
// }

// ✅ AFTER (Modern React + TS):
interface IPorfolioProps {
  userId: string;
}

export const InvestmentPortfolio = ({ 
  userId 
}: IPorfolioProps) => {
  const { data } = useGetPortfolioQuery(userId);

  return (
    <Card className="portfolio-modern">
      <Text variant="h3">Total Balance</Text>
      <CurrencyDisplay value={data?.balance} />
    </Card>
  );
};`,
}
