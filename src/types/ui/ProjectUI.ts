import type { ProjectDto, ProjectCreateRequest } from "../models/project";

export interface ProjectFormProps {
  initialData?: ProjectDto | null;
  isLoading: boolean;
  onSubmit: (data: ProjectCreateRequest) => void;
  onCancel: () => void;
}

export interface ProjectModalProps {
  isOpen: boolean;
  initialData: ProjectDto | null;
  isLoading: boolean;
  onSubmit: (data: ProjectCreateRequest) => void;
  onClose: () => void;
}
