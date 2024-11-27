import NextAuth from 'next-auth';
import {AUTH_OPTIONS} from './auth.util';

const handler = NextAuth(AUTH_OPTIONS);

export {handler as GET, handler as POST};
