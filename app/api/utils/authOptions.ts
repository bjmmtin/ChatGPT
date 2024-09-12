import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import prisma from "@/prisma/client";

interface CustomUser {
  id: string; // NextAuth expects the id to be a string
  email: string;
  hashedPassword: string | null;
  name: string;
  registeredAt: Date;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
          password,
          user.hashedPassword!,
        );

        if (!isValidPassword) return null;

        const customUser: CustomUser = {
          id: user.id.toString(),
          email: user.email,
          hashedPassword: user.hashedPassword,
          name: user.name,
          registeredAt: user.registeredAt,
        };

        return customUser;
      },
    }),

    //add here google, facebook etc.
  ],
  pages: { signIn: "/auth/signin" },
};
