const router = require('express').Router();
const passport = require("passport")
const models = require("./models");
const User = models.User;

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
  }

router.post("/api/login", (req, res, next) => {
    
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot login in", info]);
        }

        req.login(user, err => {
            res.send("Logged in");
        });
    })(req, res, next);
});

router.get("/api/logout", (req, res) => {
    req.logout();
    console.log("logged out");
    return res.send();
})

router.get("/api/user", authMiddleware, async (req, res) => {
    let user = await User.findByPk(req.session.passport.user);
    console.log([user, req.session])
    res.send({ user: user});

})


router.get('/create_user', async (req, res) => {

    try {
        const user = await User.create({
            firstName: "Anthony",
            lastName: "Nijmeh",
            email: "anthony@bondexec.com",
            password: "capeexe"
        });
        console.log("User ID: ", user.id);
    } catch (e) {
        console.log(e);
    }
    
    console.log("Router Ready!");
})

module.exports = router;