import { CheckCircle2, Code2, Database, Globe, Rocket, TrendingUp, Zap } from 'lucide-react';
import type { ExperienceData } from '@/lib/types/experience';

export const RAIZ_INVEST: ExperienceData = {
    id: 'raiz',
    company: {
        name: 'Raiz Invest',
        logo: '/images/raiz-logo.png', // Placeholder, need to check if user has assets or use text
        industry: 'Fintech',
        mission: 'To make investing simple, affordable, and accessible for everyone.',
        scale: 'Serving hundreds of thousands of users across multiple regions, managing millions in assets.',
        about: 'Empowering Australians to invest small amounts regularly.',
    },
    role: {
        title: 'Frontend Engineer',
        type: 'Contract',
        description: 'Lead the modernization of legacy frontend systems. Focused on migrating a monolithic jQuery codebase to a modular React architecture, enhancing developer velocity and user experience simultaneously.',
        focus: [
            'Modernized frontend systems',
            'Component Library Design',
            'Performance Optimization'
        ],
    },
    technicalContributions: [
        {
            title: 'React + TS Rewrite',
            description: 'Complete migration of critical investment flows from legacy jQuery/Blade templates to React functional components with strict TypeScript typing.',
            icon: Code2
        },
        {
            title: 'CRA to Vite Migration',
            description: 'Replaced Create React App with Vite, reducing local dev server startup time from ~40s to <500ms.',
            icon: Zap
        },
        {
            title: 'RTK Query Adoption',
            description: 'Implemented Redux Toolkit Query for efficient data fetching, caching, and state management, removing boilerplate Redux thunks.',
            icon: Database
        },
        {
            title: 'Code Quality & Reviews',
            description: 'Established daily PR review cycles and integrated ESLint/Prettier pipelines to maintain high code standards.',
            icon: CheckCircle2
        }
    ],
    businessImpact: [
        {
            title: 'Faster Builds',
            metric: '40% less build time',
            description: 'Improved developer velocity significantly with Vite build configuration.',
            image: '/images/experience/raiz/builds.png'
        },
        {
            title: 'Accessibility Score',
            metric: '100% Audit Score',
            description: 'Enhanced accessibility (a11y) across the web platform, broadening user reach.',
            image: '/images/experience/raiz/a11y.png'
        },
        {
            title: 'Code Quality Metrics',
            metric: 'High',
            description: 'Reduced technical debt and maintained high test coverage.',
            image: '/images/experience/raiz/quality.png'
        }
    ],
    keyTakeaways: [
        {
            title: 'Reduced Tech Debt',
            description: 'Removing legacy jQuery dependencies streamlined the codebase, making future features significantly easier to implement.',
            icon: TrendingUp
        },
        {
            title: 'Broader Reach',
            description: 'Accessibility improvements opened the platform to a wider demographic, aligning with the company\'s mission of democratization.',
            icon: Globe
        },
        {
            title: 'Improved Velocity',
            description: 'Modern tooling (Vite, RTK Query) boosted developer confidence and deployment speed, enabling daily releases.',
            icon: Rocket
        }
    ],
    theme: {
        primary: '#60C0A8', // Raiz green-ish
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #60C0A8 100%)' // Deep blue to teal
    },
    cardImage: '/images/raiz.png'
};
