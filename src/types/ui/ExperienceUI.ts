import type {
  ExperienceDto,
  ExperienceCreateRequest,
} from "../models/experience";

export interface ExperienceFormProps {
  initialData?: ExperienceDto | null;
  isLoading: boolean;
  onSubmit: (data: ExperienceCreateRequest) => void;
  onCancel: () => void;
}

export interface ExperienceModalProps {
  isOpen: boolean;
  initialData: ExperienceDto | null;
  isLoading: boolean;
  onSubmit: (data: ExperienceCreateRequest) => void;
  onClose: () => void;
}
