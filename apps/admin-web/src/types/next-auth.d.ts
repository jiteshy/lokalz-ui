import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

interface CustomProps {
  accessToken: string;
  role: string;
}

declare module "next-auth" {
  interface User extends DefaultUser, CustomProps {}
}
