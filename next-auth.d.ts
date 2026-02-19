import { DefaultSession, User } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends User {
    id: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
  }
}
