import type { EducationDto, EducationCreateRequest } from "../models/education";

export interface EducationFormProps {
  initialData?: EducationDto | null;
  isLoading: boolean;
  onSubmit: (data: EducationCreateRequest) => void;
  onCancel: () => void;
}

export interface EducationModalProps {
  isOpen: boolean;
  initialData: EducationDto | null;
  isLoading: boolean;
  onSubmit: (data: EducationCreateRequest) => void;
  onClose: () => void;
}
