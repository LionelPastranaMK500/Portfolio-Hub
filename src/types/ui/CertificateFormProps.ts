import type {
  CertificateDto,
  CertificateCreateRequest,
} from "../models/certificate";

export interface CertificateFormProps {
  initialData?: CertificateDto | null;
  isLoading: boolean;
  onSubmit: (data: CertificateCreateRequest) => void;
  onCancel: () => void;
}
