import { APIS } from "@repo/ui/config";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Called on each page navigation
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
    // Called after google sign in
    async signIn({ user }) {
      if (user) {
        const response = await fetch(APIS.AUTH.CALLBACK, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const token = await response.json();
        console.log("token----", token);
        return true;
      }
      return false;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
