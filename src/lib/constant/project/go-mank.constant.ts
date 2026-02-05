import type { ProjectData } from "../../types/project";

export const GO_MANK_PROJECT: ProjectData = {
    id: "go-mank",
    tag: "GOLANG MICROSERVICES",
    title: "GoMank",
    subtitle: "A high-performance microservices architecture for real-time data processing and analytics.",
    description: "A high-performance microservices architecture for real-time data processing and analytics.",
    links: [
        {
            url: "https://github.com/dzulfiqarzaky/go-mank",
            label: "View Source Code",
            icon: "github"
        },
        {
            url: "https://go-mank-demo.com",
            label: "Live Demo",
            icon: "live"
        }
    ],
    sections: [], // Placeholder
    theme: {
        primary: "#0EA5E9",
        gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)"
    }
};
