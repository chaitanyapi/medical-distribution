const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const Model = require('../models/model');
const config = require('./database');

module.exports = function(passport){
    opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new jwtStrategy(opts, (jwt_payload, done)=>{
        Model.getUserById(jwt_payload.data._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if (user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}