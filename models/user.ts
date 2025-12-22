import { UserRole } from "@/interfaces";

/**
 * USer Model
 */
export interface IUser {
  username: string;
  token: string;
  first_name: string;
  last_name: string;
  last_login: string;
  image: string;
  email: string;
  role: UserRole;
}
