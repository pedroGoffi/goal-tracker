import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Optional, if you're using bcrypt for password hashing
import { findUsers } from "@/lib/prisma/UserService";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";

export interface PublicUser {
  id:     string,
  email:  string,
  name:   string 
}
export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email:    { label: "Email",     type: "email" },
          password: { label: "Password",  type: "password" },
        },
        async authorize(credentials): Promise<PublicUser | null> {
            console.log("ASKED FOR AUTH")
            const users = await findUsers({ email: credentials?.email });
  
            if (!users.length) return null;
  
            const user: User = users[0];
  
            const isMatch = await bcrypt.compare(credentials!.password, user.password);
            if (isMatch) {
                return { id: user.id, email: user.email, name: user.name };
            } else {
                return null;
            }
        },
      }),
    ],
    session: {
      strategy: "jwt", // JWT-based session management
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },
      async session({ session, token }: any) {
        // Ensure that session object is populated
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        return session;
      },
    },

    pages: {
      signIn: '/auth/login',
      error:  '/'
    }
};
  