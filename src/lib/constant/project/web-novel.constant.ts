import type { ProjectData } from "@/lib/types/project";

export const WEB_NOVEL_PROJECT: ProjectData = {
    id: "web-novel",
    tag: "FULL STACK WEB APP",
    title: "Web Novel Platform",
    subtitle: "A high-performance scraping service and distraction-free reading interface for web novels.",
    description: "Designed to normalize inconsistent web novel data into a clean API using Fastify and Puppeteer, paired with a modern React frontend for an optimal reading experience.",
    githubUrl: "https://github.com/dzulfiqarzaky19/novel_server",
    liveDemoUrl: "https://web-novel-demo.com",
    isShowLiveDemo: true,
    sections: [
        {
            id: "challenge",
            type: "challenge",
            number: "01",
            heading: "The Challenge",
            description: "Inconsistent HTML structures across different web novel sites made data normalization difficult. Anti-bot mechanisms and high latency from browser instantiation were significant hurdles.",
            isTilted: true,
            image: "/images/novel-challenge.webp",
            content: {
                highlight: {
                    title: "PERFORMANCE BOTTLENECK",
                    message: "Creating a new browser instance for every request capped throughput at ~5-10 requests/min."
                }
            }
        },
        {
            id: "backend-architecture",
            type: "folder-structure",
            number: "02",
            heading: "Backend Architecture",
            description: "We adopted a Clean Architecture with strict modular boundaries. The backend separates scraping logic from API handling, ensuring robustness and ease of testing.",
            isTilted: true,
            codeSnippet: `src/
├── config/ all config files such as cors, redis, etc
├── controllers/ 
├── services/
│   ├── novel.service.ts
│   ├── puppeteer/
│   └── scrapper/
│       ├── sites/
│       │   └── novlove/
│       │       ├── chapter/
│       │       │   ├── chapterScrapper.ts
│       │       │   ├── chapterScrapper.config.ts
│       │       │   ├── chapterScrapper.parser.ts
│       │       │   ├── chapterScrapper.normalizer.ts
│       │       │   └── chapterScrapper.model.ts
│       │       ├── detail/
│       │       ├── home/
│       │       ├── list/
│       │       └── url.ts
│       └── utils/
├── routes/
├── models/
├── interfaces/
├── utils/
└── index.ts`,
            content: {
                bullets: [
                    {
                        title: "Shared Browser",
                        message: "A single browser instance serves all requests, handling dozens of concurrent pages."
                    },
                    {
                        title: "Service Pattern",
                        message: "Scraping logic is abstracted behind a Service layer, decoupling it from the Controller."
                    }
                ]
            }
        },
        {
            id: "frontend-architecture",
            type: "folder-structure",
            heading: "Frontend Architecture",
            description: "The frontend follows a Feature-Based Architecture with enforced boundaries to prevent tight coupling between distinct features.",
            isTilted: false,
            codeSnippet: `
'boundaries/element-types': [
    'error',
    {
        default: 'disallow',
        rules: [
            {
                from: ['feature'],
                allow: ['shared', ['feature', 
                { featureName: '\${from.featureName}'}
                ]]
            },
            {
                from: ['app'],
                allow: ['app', 'feature', 'shared']
            },
        ]
    }
]`,
            content: {
                bullets: [
                    {
                        title: "Architectural Enforcement",
                        message: "We used `eslint - plugin - boundaries` to physically prevent tight coupling between features. A feature cannot import another feature's internal code."
                    },
                    {
                        title: "Type-Safe Routing",
                        message: "Leveraged TanStack Router to ensure search parameters (like page number, font size) are validated and type-safe across the app."
                    },
                    {
                        title: "Mock Factory Pattern",
                        message: "Implemented a Mock Factory pattern for Vitest to solve hoisting issues and ensure consistent mocks across all unit tests."
                    }
                ]
            }
        },
        {
            id: "caching",
            type: "caching",
            number: "04",
            heading: "Caching Strategy",
            description: "Implemented an aggressive caching strategy using Redis to reduce load on target sites and improve response times.",
            isTilted: true,
            image: "/images/novel-caching.webp",
            content: {
                highlights: [
                    {
                        type: "PERFORMANCE",
                        message: "Sub-second response times for cached requests."
                    },
                    {
                        type: "RESILIENCE",
                        message: "Fallback mechanisms allow fetching fresh data if the cache layer fails."
                    },
                    {
                        type: "STORAGE",
                        message: "IndexedDB used on client-side for offline reading capabilities."
                    }
                ]
            }
        },
        {
            id: "metrics",
            type: "metrics",
            heading: "Observability & Debugging",
            description: "Built-in debugging tools and extensive logging ensure system reliability.",
            content: {
                cards: [
                    {
                        title: "Debug Artifacts",
                        description: "Automatic capturing of screenshots and HTML on scraping failures."
                    },
                    {
                        title: "Real-time Logging",
                        description: "Fastify logging for request/response cycles and error reporting."
                    },
                    {
                        title: "Resource Blocking",
                        description: "Blocking images/media to reduce bandwidth and speed up scraping."
                    }
                ]
            }
        },
        {
            id: "lessons",
            type: "lessons",
            heading: "Lessons Learned",
            image: "/images/novel-lesson.webp",
            content: {
                items: [
                    {
                        title: "Rate Limiting",
                        message: "Need explicit rate limiting to avoid IP bans from target sites."
                    },
                    {
                        title: "Browser Management",
                        message: "Managing a shared browser instance requires careful lifecycle handling to prevent memory leaks."
                    },
                    {
                        title: "Schema Validation",
                        message: "Zod validation for scraped data is crucial to detect site layout changes early."
                    }
                ]
            }
        }
    ],
    theme: {
        primary: "#10B981", // Emerald-500
        gradient: "linear-gradient(135deg, #064E3B 0%, #10B981 100%)" // Emerald-900 to Emerald-500
    }
};
