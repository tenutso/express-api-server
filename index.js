const express = require("express");
const app = express();
const routes = require("./routes.js");
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require("./auth.js");

app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
   });