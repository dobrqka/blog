const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const prisma = require("../models/prismaClient");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
