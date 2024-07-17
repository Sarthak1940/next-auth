import { AUTH_CONFIG } from "@/app/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(AUTH_CONFIG)

export const GET=  handler;
export const POST = handler;