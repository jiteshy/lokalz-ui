import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string & DefaultUser;
  }

  interface Session {
    accessToken: string & DefaultSession;
  }

  interface JWT {
    accessToken: string & DefaultJWT;
  }
}
