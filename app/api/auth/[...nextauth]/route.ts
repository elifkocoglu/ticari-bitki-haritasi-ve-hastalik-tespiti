import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { readFile } from "fs/promises";
import path from "path";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

type SimpleUser = { id: string; email: string; password?: string; name?: string; provider?: string };

async function loadUsersFromFile(): Promise<SimpleUser[]> {
  const filePath = path.join(process.cwd(), "data", "users.json");
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // 1) Authenticate with Firebase Auth directly
          const { signInWithEmailAndPassword } = await import("firebase/auth");
          const { auth } = await import("@/lib/firebase");

          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;

          // 2) Check if email is verified
          if (!user.emailVerified) {
            throw new Error("E-posta adresiniz doğrulanmamış. Lütfen gelen kutunuzu kontrol edin.");
          }

          // 3) Return user info
          return {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email,
            provider: "credentials"
          } as any;

        } catch (error: any) {
          console.error("Login error:", error);
          if (error.message.includes("doğrulanmamış")) {
            throw new Error(error.message);
          }
          if (error.code === 'auth/user-not-found') {
            throw new Error("Kullanıcı bulunamadı.");
          }
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
            throw new Error("Şifre hatalı.");
          }
          // Propagate other errors (like network issues)
          throw new Error(error.message || "Bilinmeyen bir hata oluştu.");
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).provider = token.provider || "credentials";
      return session;
    },
  },
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



