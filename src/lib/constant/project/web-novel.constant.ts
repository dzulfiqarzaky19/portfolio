import type { ProjectData } from "@/lib/types/project";

export const WEB_NOVEL_PROJECT: ProjectData = {
    id: "web-novel",
    tag: "FULL STACK WEB APP",
    title: "Web Novel Platform",
    subtitle: "A high-performance scraping service and distraction-free reading interface for web novels.",
    description: "Designed to normalize inconsistent web novel data into a clean API using Fastify and Puppeteer, paired with a modern React frontend for an optimal reading experience.",
    links: [
        {
            url: "https://github.com/dzulfiqarzaky19/novel_server",
            label: "View Server Code",
            icon: "github"
        },
        {
            url: "https://github.com/dzulfiqarzaky19/novel_client",
            label: "View Client Code",
            icon: "github"
        },
    ],
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
            id: "tech-stack",
            type: "folder-structure",
            number: "03",
            heading: "Tech Stack Rationale",
            description: "Modern full-stack TypeScript architecture optimized for performance, type safety, and developer experience with carefully chosen technologies.",
            isTilted: true,
            codeSnippet: `// Backend Stack
- Fastify > Express: 3x faster schema validation
- Puppeteer: Dynamic scraping industry standard 
- Redis: Sub-second cache, 100k+ ops/sec
- esbuild: 10-100x faster builds than Webpack

// Frontend Stack  
- React 19 + Vite: Modern DX, HMR in <1s
- TanStack Router: Type-safe search params
- TanStack Query: Stale-while-revalidate caching
- Emotion: Runtime theme switching (Light/Dark)
- Vitest > Jest: 10x faster test execution`,
            content: {
                bullets: [
                    {
                        title: "Performance First",
                        message: "Fastify's lower overhead and esbuild's speed enable rapid development iteration and production efficiency."
                    },
                    {
                        title: "Type Safety End-to-End",
                        message: "TypeScript strict mode + TanStack Router + Zod validation catch errors at compile-time, not runtime."
                    },
                    {
                        title: "Developer Experience",
                        message: "Vite HMR, tsx for TypeScript execution, and Vitest's speed optimize developer feedback loops."
                    }
                ]
            }
        },
        {
            id: "frontend-architecture",
            type: "folder-structure",
            number: "04",
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
            id: "shared-browser",
            type: "folder-structure",
            number: "05",
            heading: "Shared Browser Pattern",
            description: "A single Puppeteer browser instance serves all requests, dramatically improving throughput from ~5-10 requests/min to dozens of concurrent pages.",
            isTilted: false,
            codeSnippet: `// ❌ Before: New browser per request
for (const request of requests) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await browser.close();
}

// ✅ After: Shared browser instance
const sharedBrowser = await puppeteer.launch();

for (const request of requests) {
  const page = await sharedBrowser.newPage();

  await page.close(); // Only close page
}

if (PUPPETEER_CONFIG.assets.isBlocked) {
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'media'].includes(req.resourceType())) {
      req.abort(); // 2-5s → <1s page load
    } else {
      req.continue();
    }
  });
}`,
            content: {
                bullets: [
                    {
                        title: "Massive Performance Gain",
                        message: "Browser launch is expensive (1-2s per instance). Reusing one browser across requests eliminates this bottleneck."
                    },
                    {
                        title: "Resource Blocking",
                        message: "Blocking images and media reduces page load time from 2-5 seconds to under 1 second, saving bandwidth and memory."
                    },
                    {
                        title: "Production-Ready Lifecycle",
                        message: "Automatic retry logic and debug artifact capture (screenshots/HTML snapshots) on failure ensure robustness."
                    }
                ]
            }
        },
        {
            id: "full-stack-flow",
            type: "flow",
            number: "06",
            heading: "Full Stack Execution Flow",
            description: "End-to-end request lifecycle from the React client to the Puppeteer scraper.",
            isTilted: true,
            image: "/images/novel-flow.webp",
            content: {
                steps: [
                    {
                        title: "Client Request",
                        description: "React client sends a request to the Fastify API Gateway."
                    },
                    {
                        title: "Service Layer",
                        description: "API Controller delegates to NovelService, which checks Redis cache first."
                    },
                    {
                        title: "Scraping Engine",
                        description: "On cache miss, Puppeteer scrapes the target site using a shared browser instance."
                    },
                    {
                        title: "Data Normalization",
                        description: "Raw HTML is parsed, normalized, and validated against Zod schemas before response."
                    }
                ]
            }
        },
        {
            id: "caching",
            type: "caching",
            number: "07",
            heading: "Caching Strategy & Offline Reading",
            description: "Aggressive multi-layer caching using Redis on backend and IndexedDB on frontend for sub-second response times and offline reading capabilities.",
            isTilted: true,
            image: "/images/novel-caching.webp",
            content: {
                highlights: [
                    {
                        type: "BACKEND CACHE",
                        message: "Redis caches scraped data with configurable TTL - sub-second response times for frequently accessed novels."
                    },
                    {
                        type: "OFFLINE READING",
                        message: "IndexedDB stores recently read chapters on client-side, enabling offline access without internet connection."
                    },
                    {
                        type: "STALE-WHILE-REVALIDATE",
                        message: "React Query shows cached content instantly while fetching fresh data in background for superior perceived performance."
                    },
                    {
                        type: "RESILIENCE",
                        message: "Fallback mechanisms allow fetching fresh data if Redis fails, ensuring API remains available."
                    }
                ]
            }
        },
        {
            id: "testing-strategy",
            type: "folder-structure",
            number: "08",
            heading: "Testing Strategy",
            description: "Comprehensive testing approach with unit tests for scrapers, integration tests for service orchestration, and E2E API contract tests.",
            isTilted: true,
            codeSnippet: `// Mock Factory Pattern (Frontend)

export const routerMock = async (importOriginal) => {
  const actual = await importOriginal();
  
  const MockLink = ({ children, to, ...props }) => (
    <a href={to} {...props}>{children}</a>
  );
  
  return {
    ...actual,
    Link: MockLink,
    useMatchRoute: () => () => false,
  };
};

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const { routerMock } = await import('lib/test/mock/router');
  return routerMock(importOriginal);
});

const fixture = fs.readFileSync('./fixtures/chapter.html');
const result = chapterParser(fixture);
expect(result.content).toBeDefined();`,
            content: {
                bullets: [
                    {
                        title: "Mock Factory Pattern",
                        message: "Reusable mock factories solve Vitest hoisting issues, ensuring consistent router and API mocks across all test files."
                    },
                    {
                        title: "HTML Fixture Testing",
                        message: "Capture snapshots from target sites to verify parser logic without hitting live sites, detecting layout changes early."
                    },
                    {
                        title: "Testing Pyramid",
                        message: "80% unit tests (parser logic), 15% integration (cache orchestration), 5% E2E (API contracts) for fast feedback."
                    }
                ]
            }
        },
        {
            id: "metrics",
            type: "metrics",
            number: "09",
            heading: "Observability & Performance Metrics",
            description: "Built-in debugging tools, extensive logging, and concrete performance improvements ensure system reliability. Resource blocking reduces page load from 2-5s to <1s.",
            codeSnippet: `

const snap1 = await saveDebugArtifacts(page,
    'goto-or-selectors-failed',
    fastify.log.error.bind(fastify.log),
);
            

if (PUPPETEER_CONFIG.assets.isBlocked) {
    await page.setRequestInterception(true);

    const block = (req: any) => {
        if (PUPPETEER_CONFIG.assets.types.includes(req.resourceType())) {
            req.abort();
            return;
        }
        req.continue();
    };
    page.on('request', block);
}
            `,
            content: {
                cards: [
                    {
                        title: "Debug Artifacts",
                        description: "Automatic capturing of screenshots and HTML on scraping failures.",
                        image: "/images/novel-debug.webp"
                    },
                    {
                        title: "Real-time Logging",
                        description: "Fastify logging for request/response cycles and error reporting.",
                        image: "/images/novel-loging.webp"
                    },
                    {
                        title: "Resource Blocking",
                        description: "Blocking images/media to reduce bandwidth and speed up scraping.",
                        image: "/images/novel-blocking.webp"
                    }
                ]
            }
        },
        {
            id: "lessons",
            type: "lessons",
            number: "10",
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
