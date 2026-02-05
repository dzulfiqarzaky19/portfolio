export interface ProjectSection {
    id: string;
    type: 'challenge' | 'folder-structure' | 'caching' | 'metrics' | 'lessons' | 'cta';
    number?: string;
    heading: string;
    description?: string;
    image?: string;
    codeSnippet?: string;
    imageAlt?: string;
    isTilted?: boolean;
    content?: any; // Specific content for different section types
}

export interface ProjectData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    links?: Array<{
        url: string;
        label: string;
        icon?: 'github' | 'live' | 'other';
    }>;
    githubUrl?: string; // @deprecated use links instead
    liveDemoUrl?: string; // @deprecated use links instead
    isShowLiveDemo?: boolean; // @deprecated use links instead
    theme: {
        primary: string;
        gradient: string;
    };
    sections: Array<ProjectSection>;
}
