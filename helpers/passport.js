const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.initialize()
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, pwd, done) => {
            const user = await User.findOne({
                where: {
                    email: email,
                    admin: req.body.admin ? 1 : 0,
                },
            })
            try {
                if (!user) {
                    return done(null, false, { message: 'Incorrect email or admin status' })
                }
                if (!User.validPassword(user, pwd)) {
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user)
            } catch (err) {
                done(err)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({
            where: {
                id,
            },
        })
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})
