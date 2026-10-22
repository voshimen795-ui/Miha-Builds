// Set NEXT_PUBLIC_SITE_URL once the domain is bought; until then Vercel's
// production URL is used so links in previews and sitemaps stay absolute.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
