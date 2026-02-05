import type { LucideIcon } from 'lucide-react';

export interface ExperienceSection {
    title: string;
    description: string;
    icon?: LucideIcon;
    image?: string;
    metric?: string;
}

export interface ExperienceData {
    id: string;
    company: {
        name: string;
        logo: string; // URL or path
        industry: string;
        mission: string;
        scale: string;
        about: string; // The "About the Company" text
        website?: string;
    };
    role: {
        title: string;
        type: string; // e.g. "Frontend Engineer"
        period?: string;
        description: string;
        focus: Array<string>; // e.g., ["Modernized frontend systems", ...]
        image?: string;
    };
    technicalContributions: Array<ExperienceSection>;
    businessImpact: Array<ExperienceSection>;
    keyTakeaways: Array<ExperienceSection>;
    challenges?: Array<ExperienceSection>;
    theme: {
        primary: string;
        gradient: string;
    };
    cardImage?: string;
    codeSnippet?: string;
    codeLanguage?: string;
}
