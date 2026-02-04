export interface ProjectSection {
    id: string;
    type: 'challenge' | 'folder-structure' | 'caching' | 'metrics' | 'lessons' | 'cta';
    number?: string;
    heading: string;
    description?: string;
    image?: string;
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
    githubUrl?: string;
    liveDemoUrl?: string;
    isShowLiveDemo?: boolean;
    sections: Array<ProjectSection>;
}
