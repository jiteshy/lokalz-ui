import { APIS } from "@repo/ui/config";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { User } from "./utils/types";

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
        const response = await fetch(APIS.AUTH.ADMIN.CALLBACK, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const customUser: User = await response.json();
        user.accessToken = customUser.token;
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      // Add the custom token fetched from backend after sign in
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      // Use the custom token fetched from backend after sign in
      return { ...session, accessToken: token.accessToken };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
