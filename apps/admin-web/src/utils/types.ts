import { User } from "next-auth";

export interface CustomUser extends User {
  token: string;
  role: string;
}
