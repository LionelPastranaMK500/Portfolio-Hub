import type {
  SocialLinkDto,
  SocialLinkCreateRequest,
} from "../models/socialLink";

export interface SocialLinkFormProps {
  initialData?: SocialLinkDto | null;
  isLoading: boolean;
  onSubmit: (data: SocialLinkCreateRequest) => void;
  onCancel: () => void;
}

export interface SocialLinkModalProps {
  isOpen: boolean;
  initialData: SocialLinkDto | null;
  isLoading: boolean;
  onSubmit: (data: SocialLinkCreateRequest) => void;
  onClose: () => void;
}
