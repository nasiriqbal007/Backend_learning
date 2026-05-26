export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
}

export interface JwtPayload {
  id: number;
  email: string;
}
