import type { ProfileDto, ProfileUpdateRequest } from "../models/profile";

export interface ProfileFormProps {
  initialData?: ProfileDto;
  isLoading: boolean;
  isSaving: boolean;
  onSubmit: (data: ProfileUpdateRequest) => void;
}
