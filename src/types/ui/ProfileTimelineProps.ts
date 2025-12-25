import type {
  ExperienceDto,
  EducationDto,
  CertificateDto,
} from "../../types/models";

export interface ProfileTimelineProps {
  experiences: ExperienceDto[];
  education: EducationDto[];
  certificates: CertificateDto[];
}
