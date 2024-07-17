import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export const AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials: any) {
        return {
          id: "1",
          name: "Sarthak Godse",
          email: "sarthak.godse@gmail.com",
        }
      },     
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({token, user}: any) => {
      console.log(token);    
      token.userId = token.sub
      return token
    },
    session: ({session, token, user}: any) => {
      if (session && session.user) {
        session.user.id = token.userId
      }
      return session
    }
  },
  pages: {
    signIn: "/signin"
  }
}