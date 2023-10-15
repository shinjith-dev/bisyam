import { UserType } from "./types";

export type AuthUser = {
  token: string;
  user: UserType;
};

export type LoginType = {
  username: string;
  password: string;
};

export type RegisterType = {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type GauthType = {
  credential?: string;
};

interface FileBlob extends Blob {
  name?: string;
}

export type AuthResponse = {
  message: string;
  data?: AuthUser;
  success?: boolean;
};
