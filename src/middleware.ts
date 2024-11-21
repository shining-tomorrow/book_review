/**
 * Without a defined matcher, this one line applies next-auth to the entire project
 */
export {default} from 'next-auth/middleware';

/**
 * Applies next-auth only to matching routes - can be regex
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ['/((?!api|register|poll|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
