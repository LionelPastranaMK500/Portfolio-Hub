import type { ProjectSummaryDto } from "../../types/models/publicapi";
export interface ProfileProjectsProps {
  projects: ProjectSummaryDto[];
  profileSlug: string;
}
