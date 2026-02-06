import type { ProjectData } from "@/lib/types/project";

export const EMPLOYEES_20K_PROJECT: ProjectData = {
    id: "employees-20k",
    tag: "FULL STACK HR DASHBOARD",
    title: "Employees 20k",
    subtitle: "A high-performance HR dashboard designed to handle 20,000+ employee records without lag, featuring real-time updates and seamless virtualization.",
    description: "Built to solve the 'blocking UI' problem of large datasets. Features a React 19 virtualized frontend for 60FPS scrolling and a Node.js/BullMQ backend for non-blocking bulk operations.",
    links: [
        {
            url: "https://github.com/dzulfiqarzaky19/employees20k_FE",
            label: "View Frontend Code",
            icon: "github"
        },
        {
            url: "https://github.com/dzulfiqarzaky19/employees20k_BE",
            label: "View Backend Code",
            icon: "github"
        },
    ],
    sections: [
        {
            id: "challenge",
            type: "challenge",
            number: "01",
            heading: "The Challenge",
            description: "Rendering high-volume data (20,000+ employee records) causes DOM bloating and UI lag. Bulk operations like mass imports typically block the main thread, leading to timeouts.",
            isTilted: true,
            image: "/images/ems-table.webp",
            content: {
                highlight: {
                    title: "The 20k Problem",
                    message: "Browser DOM cannot handle 20,000 <tr> elements. Network requests for such datasets take 10s+ on average connections."
                }
            }
        },
        {
            id: "frontend-architecture",
            type: "folder-structure",
            number: "02",
            heading: "Frontend Architecture",
            description: "We adopted a Feature-Based Architecture. Code is co-located by business domain (Dashboard, Payroll) rather than technical role, preventing logic leak.",
            isTilted: true,
            codeSnippet: `src/
├── features/           # Domain-specific logic
│   └── dashboard/      
│       ├── components/ # Table, Charts 
│       ├── context/    # TableContext (Scoped state)
│       └── hooks/      # useEmployeeMutations
├── components/         # Shared UI (Buttons, Inputs)
├── context/            # Global app state (Auth, Theme)
├── lib/                # Utilities
└── pages/              # Route entry points`,
            content: {
                bullets: [
                    {
                        title: "Modularity",
                        message: "Deleting a feature folder removes all its logic without breaking the rest of the app."
                    },
                    {
                        title: "Scoped Context",
                        message: "Table state is scoped to the Dashboard feature, preventing re-renders in the Navbar or Sidebar."
                    },
                    {
                        title: "Performance Isolation",
                        message: "Typing in dashboard search doesn't trigger re-renders outside the feature - avoiding global state pollution."
                    }
                ]
            }
        },
        {
            id: "tech-stack",
            type: "folder-structure",
            number: "03",
            heading: "Tech Stack Rationale",
            description: "Carefully chosen technologies optimized for handling 20k+ records with modern developer experience and production reliability.",
            isTilted: false,
            codeSnippet: `// Frontend Stack
- React 19: Concurrent features + compiler auto-memoization
- @tanstack/react-virtual: THE virtualization solution
- @tanstack/react-table: Headless (100% styling control)
- @tanstack/react-query: Client cache + deduplication
- Vite 7: 10x faster HMR than Webpack
- Tailwind 4 + Shadcn: Utility-first + accessible components

// Backend Stack  
- Express 5: Stable, minimalist, battle-tested
- Prisma: Type-safe queries + auto-migrations
- BullMQ: Redis queue with priority support
- PostgreSQL 15: ACID compliance for employee data
- Socket.IO: Bidirectional real-time updates`,
            content: {
                bullets: [
                    {
                        title: "TanStack Trio",
                        message: "React Virtual (rendering), React Table (logic), React Query (data) - all three chosen for headless architecture giving 100% control over UI."
                    },
                    {
                        title: "Prisma Type Safety",
                        message: "Auto-generated TypeScript types from database schema eliminate runtime errors and enable instant autocomplete."
                    },
                    {
                        title: "BullMQ Reliability",
                        message: "Redis-backed queue ensures imports survive server restarts with built-in retry logic and priority support."
                    }
                ]
            }
        },
        {
            id: "backend-architecture",
            type: "folder-structure",
            number: "04",
            heading: "Backend Architecture",
            description: "We adopted a Clean Architecture with strict modular boundaries. The backend separates scraping logic from API handling, ensuring robustness and ease of testing.",
            isTilted: true,
            codeSnippet: `src/
├── config/             # Environment & DB Config
├── controllers/        # Request Handlers
├── services/           # Business Logic
│   ├── employee.service.ts
│   └── import.service.ts
├── repositories/       # Data Access Layer
├── workers/            # BullMQ Processors
│   └── import.worker.ts
├── routes/             # API Definitions
└── index.ts`,
            content: {
                bullets: [
                    {
                        title: "Service Pattern",
                        message: "Business logic is decoupled from HTTP transport, making it testable and reusable."
                    },
                    {
                        title: "Worker Isolation",
                        message: "Heavy processing logic is isolated in worker files, preventing main thread blockage."
                    },
                    {
                        title: "Parallel Aggregation",
                        message: "Promise.all executes multiple DB queries concurrently - 3x faster dashboard loads vs sequential awaits."
                    }
                ]
            }
        },
        {
            id: "virtualization",
            type: "folder-structure",
            number: "05",
            heading: "The '20k' Solution: Virtualization",
            description: "Instead of rendering 20,000 rows, we render a container with the total height but only physically mount the ~20 rows visible in the viewport.",
            isTilted: false,
            codeSnippet: `const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize: () => 64, 
  overscan: 20, 
});

// Render
<div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\` }}>
  {rowVirtualizer.getVirtualItems().map((virtualRow) => (
    <div 
      key={virtualRow.key}
      style={{ transform: \`translateY(\${virtualRow.start}px)\` }}
    >
      {/* Row Content */}
    </div>
  ))}
</div>`,
            content: {
                bullets: [
                    {
                        title: "60fps Scrolling",
                        message: "Scroll latency <16ms per frame regardless of dataset size - tested with 20,000 rows."
                    },
                    {
                        title: "Constant Memory",
                        message: "~50MB memory footprint by recycling DOM nodes - no memory spikes even with massive datasets."
                    },
                    {
                        title: "Hardware Accelerated",
                        message: "Uses CSS transform (translateY) for GPU-accelerated positioning instead of top/left."
                    }
                ]
            }
        },
        {
            id: "stream-batch",
            type: "folder-structure",
            number: "06",
            heading: "Stream + Batch Pattern",
            description: "Combining Node.js Streams for memory efficiency with batch inserts for database performance and real-time progress for superior UX.",
            isTilted: true,
            codeSnippet: `const parser = fs.createReadStream(filePath)
  .pipe(parse({ columns: true, trim: true }));

for await (const record of parser) {
  batch.push(mappedRecord);

  if (batch.length >= 1000) {
    await prisma.employee.createMany({ 
      data: batch, 
      skipDuplicates: true 
    });
    
    await job.updateProgress({
      percentage: Math.round((count / total) * 100),
      count
    });
    
    batch = [];
  }
}`,
            content: {
                bullets: [
                    {
                        title: "Memory Efficient Streaming",
                        message: "Processes 100MB CSV files chunk-by-chunk preventing 'heap out of memory' errors - constant memory usage regardless of file size."
                    },
                    {
                        title: "100x Performance Gain",
                        message: "Batching 1000 rows per DB call eliminates network round-trip overhead - dramatically faster than individual inserts."
                    },
                    {
                        title: "Real-time Progress",
                        message: "Socket.IO updates after each batch keep users informed during long-running imports with granular 0-100% progress bars."
                    }
                ]
            }
        },
        {
            id: "application-flow",
            type: "flow",
            number: "07",
            heading: "Application Flow",
            description: "A layered architecture separating Controllers, Services, and Repositories, processed via a Redis Job Queue for heavy lifting.",
            isTilted: true,
            image: "/images/ems-flow.webp",
            content: {
                steps: [
                    {
                        title: "Client Request",
                        description: "React client initiates bulk import or data fetch."
                    },
                    {
                        title: "Queue System",
                        description: "BullMQ (Redis) accepts job immediately, returning '202 Accepted' to prevent blocking."
                    },
                    {
                        title: "Worker Process",
                        description: "Background workers process streams and batch insert into PostgreSQL."
                    },
                    {
                        title: "Real-time Update",
                        description: "Socket.IO pushes progress (e.g., '45% processed') back to the UI."
                    }
                ]
            }
        },
        {
            id: "bulk-import",
            type: "metrics",
            number: "08",
            heading: "Bulk Operations",
            description: "Handling 20,000 record imports using Node.js Streams and Batch Inserts.",
            isTilted: true,
            image: "/images/ems-upload.webp",
            content: {
                cards: [
                    {
                        title: "Stream Processing",
                        description: "Processes files chunk-by-chunk to prevent memory spikes.",
                        image: "/images/ems-stream.webp"
                    },
                    {
                        title: "Batch Inserts",
                        description: "100x faster than individual inserts by grouping 1000 records per DB call.",
                        image: "/images/ems-batch.webp"
                    },
                    {
                        title: "Real-time Feedback",
                        description: "Socket.IO provides granular progress bars for long-running tasks.",
                        image: "/images/ems-realtime.webp"
                    }
                ]
            }
        },
        {
            id: "testing",
            type: "folder-structure",
            number: "09",
            heading: "Testing Strategy",
            description: "Comprehensive testing approach combining mocked integration tests for backend API and virtualization tests for frontend rendering performance.",
            isTilted: true,
            codeSnippet: `// Backend: Mocked Integration Tests
jest.mock('../config/prisma');

it('handles import errors gracefully', async () => {
  prismaMock.employee.createMany.mockRejectedValue(
    new Error('DB Connection Lost')
  );
  
  const response = await request(app)
    .post('/api/import')
    .attach('file', 'test.csv');
    
  expect(response.status).toBe(500);
});

// Frontend: Virtualization Performance
it('renders only visible rows', () => {
  const data = generateRows(20000);
  render(<DataTable data={data} />);
  
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeLessThan(50); // Not 20k!
});`,
            content: {
                bullets: [
                    {
                        title: "Mocked Integration Tests",
                        message: "Backend uses Supertest + Jest with mocked Prisma client - tests business logic without spinning up real databases."
                    },
                    {
                        title: "Virtualization Validation",
                        message: "Frontend tests verify only visible rows are mounted - ensuring DOM optimization actually works at scale."
                    },
                    {
                        title: "80% Coverage Target",
                        message: "Focus on Controllers/Services (backend) and core table logic (frontend) with unit + integration tests."
                    }
                ]
            }
        },
        {
            id: "docker-infrastructure",
            type: "caching",
            number: "10",
            heading: "Docker & Infrastructure",
            description: "Containerized environment ensuring consistent behavior across development and production.",
            isTilted: true,
            image: "/images/ems-docker.webp",
            content: {
                highlights: [{
                    type: "Containerized Stack",
                    message: "Orchestrating Node.js API, PostgreSQL 15, and Redis 7 with Docker Compose for one-command setup."
                },
                {
                    type: 'running docker',
                    message: 'Running docker-compose up -d to start all services.'
                }
                ]
            }
        },
        {
            id: "lessons",
            type: "lessons",
            number: "11",
            heading: "Lessons Learned",
            image: "/images/ems-upload.webp",
            content: {
                items: [
                    {
                        title: "Stream Processing",
                        message: "Using Node.js Streams is essential for memory efficiency when parsing large CSV files."
                    },
                    {
                        title: "Batch Inserts",
                        message: "Database calls must be batched. Inserting 20k rows one-by-one is infeasible."
                    },
                    {
                        title: "Background Jobs",
                        message: "Long-running tasks must be offloaded to a queue (BullMQ) to keep the API responsive."
                    }
                ]
            }
        }
    ],
    theme: {
        primary: "#3B82F6", // Blue-500
        gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)" // Blue-900 to Blue-500
    }
};
