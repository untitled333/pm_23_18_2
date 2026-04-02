export interface NameData {
  firstName: string;
  lastName: string;
  title: string;
}

export interface ExpertiseItem {
  skill: string;
  level: number;
}

export interface ProfileData {
  email: string;
  phone?: string;
  location?: string;
  summary: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
