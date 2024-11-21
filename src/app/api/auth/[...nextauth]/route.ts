import {prisma} from '@/db/client';
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from 'next';
import type {AuthOptions, SessionStrategy} from 'next-auth';
import NextAuth, {getServerSession} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

const AUTH_OPTIONS: AuthOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: '비밀번호', type: 'password'},
      },
      async authorize(credentials) {
        const {email, password} = credentials ?? {};

        if (!email || !password) return null;

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const user = await prisma.user.findUnique({
          where: {
            email,
            password,
          },
        });

        // If no error and we have user data, return it
        if (user && email === user.email && password === user.password) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, account}: any) {
      // 헤더에 필요한 정보만 token에 저장
      if (user) {
        token.nickname = user.nickname;
        token.profile_image_url = user.profile_image_url;
        token.user_id = user.id;
      }

      if (account) {
        token.accountId = account.type === 'credentials' ? account.providerAccountId : null; // todo
      }

      return token;
    },
    /**
     * @param args The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security
     * @returns
     */
    async session({session, token}: any) {
      session.user.nickname = token.nickname;
      session.user.profile_image_url = token.profile_image_url;
      session.user.id = token.user_id;

      return session;
    },
  },
};

const handler = NextAuth(AUTH_OPTIONS);

export {handler as GET, handler as POST};
export const getSession = handler.auth;

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, AUTH_OPTIONS);
}
