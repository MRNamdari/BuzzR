import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Configures NextAuth for loggin in with credentials
 * Assignes custom login and logout pages
 * Adds `username` and `role` in JWToken and also in Session
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text", name: "phoneNumber" },
        password: { type: "password", name: "verificationCode" },
      },

      // Validates user's credentials
      async authorize(credentials) {
        // Stores User object if foun
        console.log(credentials);

        // try {
        //   const { id, name, role_id } = await verifyUserOTP(
        //     credentials.username as string,
        //     credentials.password as string,
        //   );
        //   console.log("authorize: %o", { id, name, role_id });
        //   return {
        //     id,
        //     name,
        //     username: String(credentials.username),
        //     role_id,
        //   };
        // } catch (e) {
        //   return null;
        // }
        return null;
      },
    }),
  ],

  // Custom pages must be introduced to next-auth
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },

  // Additional parameters (eg: role_id, username)
  // must be added to jwt and session
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        if (user.id) token.id = user.id;
        token.username = user.username;
        // token.role_id = user.role_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        // session.user.role_id = token.role_id;
      }
      return session;
    },
  },
});
