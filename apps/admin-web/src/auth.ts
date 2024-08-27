import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     keyPhrase: {
    //       label: "Key Phrase",
    //       type: "password",
    //       placeholder: "Enter key phrase",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (process.env.AUTH_KEY_PHRASE === credentials?.keyPhrase) {
    //       return { id: "admin", name: "Admin" };
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
});
