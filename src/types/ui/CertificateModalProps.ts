import type {
  CertificateDto,
  CertificateCreateRequest,
} from "../models/certificate";

export interface CertificateModalProps {
  isOpen: boolean;
  initialData: CertificateDto | null;
  isLoading: boolean;
  onSubmit: (data: CertificateCreateRequest) => void;
  onClose: () => void;
}
