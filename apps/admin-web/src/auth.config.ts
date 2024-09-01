import type { NextAuthConfig, User } from "next-auth";
import { NextResponse } from "next/server";
import { CustomUser } from "@/utils/types";
import { getUserFromDB } from "@/utils/helper";
import { JWT } from "next-auth/jwt";

const mergeCustomUser = (token: JWT, customUser: User | CustomUser) => {
  token.accessToken = customUser.accessToken;
  token.role = customUser.role;

  return token;
};

const isTokenValid = (token: string | undefined) => {
  if (!token) return false;
  // Check token expiry
  const expiresAt = JSON.parse(atob(token.split(".")[1])).exp * 1000;
  return Date.now() < expiresAt;
};

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
        const customUser: CustomUser = await getUserFromDB(user);
        user.accessToken = customUser.token;
        user.role = customUser.role;
        return true;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      // Add the custom token fetched from backend after initial sign in
      if (account && user) {
        return mergeCustomUser(token, user);
      }

      // Return previous token if the access token has not expired yet
      if (isTokenValid(token.accessToken)) {
        return token;
      }

      // Access token has expired, try to update it
      console.log("Token is invalid, refreshing..");
      const customUser: CustomUser = await getUserFromDB({
        name: token.name,
        email: token.email,
        image: token.picture,
      });
      return mergeCustomUser(token, customUser);
    },
    async session({ session, token }) {
      // Use the custom token fetched from backend after sign in
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as string,
          accessToken: token.accessToken as string,
        },
      };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
