import type {
  SkillCategoryDto,
  SkillCategoryCreateRequest,
} from "../models/skillCategory";
import type { SkillDto, SkillCreateRequest } from "../models/skill";

// --- CATEGORY UI ---
export interface CategoryFormProps {
  initialData?: SkillCategoryDto | null;
  isLoading: boolean;
  onSubmit: (data: SkillCategoryCreateRequest) => void;
  onCancel: () => void;
}

export interface CategoryModalProps {
  isOpen: boolean;
  initialData: SkillCategoryDto | null;
  isLoading: boolean;
  onSubmit: (data: SkillCategoryCreateRequest) => void;
  onClose: () => void;
}

// --- SKILL UI ---
export interface SkillFormProps {
  initialData?: SkillDto | null;
  initialSortOrder?: number;
  isLoading: boolean;
  onSubmit: (data: SkillCreateRequest) => void;
  onCancel: () => void;
}

export interface SkillModalProps {
  isOpen: boolean;
  initialData: SkillDto | null;
  isLoading: boolean;
  onSubmit: (data: SkillCreateRequest) => void;
  onClose: () => void;
}
