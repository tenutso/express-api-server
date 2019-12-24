const passport = require('passport');
const models = require("./models");
const User = models.User;
const bcrypt = require('bcryptjs');

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
  
      async (username, password, done) => {
        let user;
        try {
            user = await User.findOne({where:{email: username}});
        } catch (e) {
            console.log(e);
            done(e);
        }      
        if (user) {
            // if the user is found check the password
            if (user.password === password)
                done(null, user)
            else {
                done(null, false, { message: 'Incorrect password'})
            }
        } 
        else {
          // if no user is found return generic message
          done(null, false, { message: 'Incorrect username or password'})
        }
      }
    )
  )


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser( async (id, done) => {
    let user;
    try {
        user = User.findByPk(id);
    } catch (e) {
        done(e);
    }
    
    done(null, user);
  })

module.exports = passport;