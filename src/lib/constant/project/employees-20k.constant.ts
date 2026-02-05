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
                    }
                ]
            }
        },
        {
            id: "backend-architecture",
            type: "folder-structure",
            number: "03",
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
                    }
                ]
            }
        },
        {
            id: "virtualization",
            type: "folder-structure",
            number: "04",
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
                        title: "Zero Lag",
                        message: "Achieved <16ms per frame (60fps) scrolling performance regardless of dataset size."
                    },
                    {
                        title: "Memory Efficient",
                        message: "Keeps memory footprint low (~50MB) by recycling DOM nodes."
                    }
                ]
            }
        },
        {
            id: "application-flow",
            type: "flow",
            number: "05",
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
            number: "06",
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
            id: "docker-infrastructure",
            type: "caching",
            number: "07",
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
            number: "08",
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
