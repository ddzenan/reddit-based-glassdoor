import Snoowrap from "snoowrap";

export const redditClient = new Snoowrap({
  userAgent: "glassdoor-like-app",
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN!,
});
