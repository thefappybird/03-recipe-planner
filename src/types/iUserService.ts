import type { LoginUser, RegisterUser } from "./interfaces";

export interface UserService {
  getProfile(): Promise<any>;
  register(data: RegisterUser): Promise<any>;
  login(credentials: LoginUser): Promise<any>;
}
