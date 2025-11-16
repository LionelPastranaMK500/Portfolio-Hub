// src/types/User.ts
// Basado en ProfileDto.java
export interface User {
  id: number;
  slug: string;
  fullName: string;
  headline: string;
  bio: string;
  contactEmail: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
}
