import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../utils/prisma";
import GoogleProvider from "next-auth/providers/google";
import TeamEnrollmentService from "../../../services/TeamEnrollment.service";

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
      const teamsResponse = await TeamEnrollmentService.getAllByUserId(user.id);
      session.user.teams = teamsResponse.data;
      session.user.id = user.id;
      session.selectedTeamId =
        teamsResponse.data.length > 0 ? teamsResponse.data[0].teamId : null;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login",
  },
});
