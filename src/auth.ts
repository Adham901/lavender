import { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JSON_HEADER } from './lib/constants/shared.constant';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1440 * 60, // 1440 minutes (24 hours)
  },

  jwt: {
    maxAge: 1440 * 60, // 1440 minutes (24 hours)
  },

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API_URL}/admin/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload = await response.json();

        if (!response.ok || !payload.success) {
          throw new Error(payload.message || 'Login failed');
        }

        const userData = payload.data;

        return {
          id: userData.profile.username,
          name: userData.profile.name,
          username: userData.profile.username,
          email: userData.profile.email,
          avatar: userData.profile.avatar,
          role: userData.role,
          permissions: userData.permissions,
          token: userData.tokenDetails.token,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        (token as any).accessToken = (user as any).token;
        (token as any).user = user;
        (token as any).role = (user as any).role;
        (token as any).permissions = (user as any).permissions;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // ✅ لو الـ token منتهي، ارجع session فاضي
      if (token?.exp) {
        const now = Math.floor(Date.now() / 1000);
        const exp = typeof token.exp === 'number' ? token.exp : Number(token.exp);

        if (!isNaN(exp) && now > exp) {
          // ارجع session فاضي بدل throw error
          return {
            ...session,
            user: null,
            accessToken: null,
          } as any;
        }
      }

      session.user = (token as any).user ?? session.user;
      (session as any).accessToken = (token as any).accessToken;
      (session.user as any).role = (token as any).role;
      (session.user as any).permissions = (token as any).permissions;
      return session;
    },
  },
};
