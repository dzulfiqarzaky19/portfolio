import { CHAT_SNAP_PROJECT } from "./project/chat-snap.constant";
import { GO_MANK_PROJECT } from "./project/go-mank.constant";
import { LEGACY_SYSTEM_PROJECT } from "./project/legacy-system.constant";
import { PORTFOLIO_PROJECT } from "./project/portfolio.constant";
import type { ProjectData } from "../types/project";

export const PROJECT_DETAILS: Record<string, ProjectData> = {
    "legacy-system": LEGACY_SYSTEM_PROJECT,
    "chat-snap": CHAT_SNAP_PROJECT,
    "go-mank": GO_MANK_PROJECT,
    "portfolio": PORTFOLIO_PROJECT,
};
