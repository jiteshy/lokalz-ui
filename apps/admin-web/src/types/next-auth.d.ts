import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

interface CustomProps {
  accessToken: string;
  role: string;
}

declare module "next-auth" {
  interface User extends DefaultUser, CustomProps {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT, CustomProps {}
}
