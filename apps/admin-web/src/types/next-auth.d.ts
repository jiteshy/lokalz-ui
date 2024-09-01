import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import "@tanstack/react-table";

interface CustomProps {
  accessToken: string;
  role: string;
}

declare module "next-auth" {
  interface User extends DefaultUser, CustomProps {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, CustomProps {}
}

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerClassName?: string;
    cellClassName?: string;
  }
}
