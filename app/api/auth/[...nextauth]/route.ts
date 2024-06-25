import NextAuth from "next-auth";
import { authOptions } from "../../utils/authOptions";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
