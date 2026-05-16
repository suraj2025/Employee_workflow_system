export interface LoginRequest {

  email: string;

  password: string;
  forceLogin?: boolean;
}

export interface AuthResponse {

  token: string;

  email: string;

  role: string;
}