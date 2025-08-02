import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { User } from "../features/user/user.model.js";
import { logger } from "../middlewares/logger.middleware.js";

const callbackHandler = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json?.email || profile.emails?.[0]?.value;
    const loginType = profile.provider.toUpperCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) return done(null, existingUser);

    const user = await User.create({
      fullName: profile._json?.name || profile.displayName,
      avatar:
        profile._json?.picture ||
        profile._json?.avatar_url ||
        profile.photos?.[0]?.value,
      email,
      loginType,
    });

    done(null, user);
  } catch (error) {
    logger.error(error.message);
    done(error, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/user/google/callback",
    },
    callbackHandler
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/v1/user/github/callback",
    },
    callbackHandler
  )
);
