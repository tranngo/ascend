import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../utils/prisma";
import GoogleProvider from "next-auth/providers/google";
import axios from "../../../utils/api";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const teamsResponse = await axios.get("/teamenrollments/" + user.id);
      session.user.teams = teamsResponse.data;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login",
  },
});
