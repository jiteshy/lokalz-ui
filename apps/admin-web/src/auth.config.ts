import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      
      let targetUrl;
      if (isOnLoginPage) {
        if (isLoggedIn) {
          targetUrl = "/";
        }
      } else {
        if (!isLoggedIn) {
          targetUrl = "/login";
        }
      }

      if (targetUrl) {
        return NextResponse.redirect(new URL(targetUrl, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
