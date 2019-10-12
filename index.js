var port = process.env.PORT || 8080;
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose"),
    request = require("request");
const axios = require('axios');
const fetch = require('node-fetch');

mongoose.connect("mongodb://localhost/coding_app", { useNewUrlParser: true })
app.use(require("express-session")({
    secret: "prototype",
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//==============
//Routes
//==============

app.get("/", function (req, res) {
    res.render("landing");
})


app.post("/register", (req, res) => {
    console.log(req.body.handle);
    axios.get('https://codeforces.com/api/user.info?handles=' + req.body.handle)
        .then(response => {
            console.log(response.data);
            User.register(new User({ username: req.body.username, email: req.body.email, handle: req.body.handle }), req.body.password, function (err, user) {
                if (err) {
                    console.log(err)
                    return res.render("/login2")
                }
                passport.authenticate("local")(req, res, function () {
                    console.log(user.username);
                    res.redirect("/userprofile");

                })
            })
            //console.log(response.data);
            //console.log(response.data.explanation);
        })
        .catch(error => {
            console.log(error);
        });
})

app.get("/login2", function (req, res) {
    res.render("login2")
})

app.post("/login2", passport.authenticate("local", {
    successRedirect: "/userprofile",
    failureRedirect: "/login2"
}), function (req, res) {
})

app.get("/logout", isLoggedIn, function (req, res) {
    req.logout();
    res.redirect("/");
})

app.get("/userprofile", isLoggedIn, (req, res) => {
    res.render("userprofile");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login2")
}

//for Questions Update
var requestLoop = setInterval(function () {
    request({
        url: "http://www.google.com",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('sucess!');
        } else {
            console.log('error' + response.statusCode);
        }
    });
}, 60000);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});



// app.get("/unsolved", async function(req, res) {
//     const obj = await fetchData(req.user);
//     if(obj.verdict!="OK")
//     res.render("unsolved", { obj });
//   });
//   function fetchData(){
//     return fetch("https://codeforces.com/api/user.status?handle=" + this.req.user + "&from=1&count=50")
//         .then(res => res.json())
//   }

