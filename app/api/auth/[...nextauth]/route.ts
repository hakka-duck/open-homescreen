import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // 引入 bcrypt
import prisma from "@/lib/prisma";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "帳號" },
        password: { label: "Password", type: "password", placeholder: "密碼" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // 從資料庫中獲取使用者
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null; // 使用者未找到
        }

        // 檢查密碼是否匹配
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          return null; // 密碼不正確
        }

        // 如果找到使用者且密碼匹配，返回使用者物件
        return {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // 將 ID 添加到 session 對象中
      if (session.user) {
        session.user.id = token.id as number;
      }
      return session;
    },
    async jwt({ token, user }) {
      // 在用戶登錄時將 ID 添加到 token 中
      if (user) {
        token.id = user.id as number;
      }
      return token;
    },
  },
  debug: true,
  secret: process.env.SECRET,
  session: {
    maxAge: 60 * 30,
  },
};

const authHandler = NextAuth(options);
export { authHandler as GET, authHandler as POST };
