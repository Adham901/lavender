import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    token: string;
    user: {
      name: string;
      username: string;
      email: string;
      phone: string;
      address: string;
      avatar: string;
      role: string;
      permissions: {
        permissionName: string;
        access: boolean;
      }[];
    };
  }

  interface Session extends DefaultSession {
    token: string;
    user: User['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    user: User['user'];
  }
}
