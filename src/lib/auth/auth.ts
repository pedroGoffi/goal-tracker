import NextAuth from "next-auth";
import { authOptions } from "@/lib/AuthOptions"

export const authHandler = NextAuth(authOptions);

export const { auth } = authHandler

