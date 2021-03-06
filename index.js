var port = process.env.PORT || 8080;
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Friend = require("./models/friends"),
    passportLocalMongoose = require("passport-local-mongoose"),
    request = require("request");
const axios = require('axios');

 mongoose.connect("mongodb://localhost/coding_app",{ useNewUrlParser: true })
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

<<<<<<< HEAD
app.get("/", function (req, res) {
=======
app.get("/", function(req,res){
>>>>>>> 177f33ce4adfa41a7d0aeabfc72e53b266359d98
    res.render("landing");
})
app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
})

<<<<<<< HEAD
//Auth Routes

app.post("/register", (req, res) => {
    console.log(req.body.handle);
    axios.get('https://codeforces.com/api/user.info?handles=' + req.body.handle)
        .then(response => {
            console.log(response.data);
            User.register(new User({ username: req.body.username, FullName: req.body.FullName, email: req.body.email, collegeName: req.body.collegeName, handle: req.body.handle }), req.body.password, function (err, user) {
                if (err) {
=======

 app.post("/register",(req,res)=>{
    console.log(req.body.handle);
    axios.get('https://codeforces.com/api/user.info?handles='+req.body.handle)
      .then(response => {
          console.log(response.data);
            User.register(new User({username: req.body.username,email: req.body.email,handle: req.body.handle}), req.body.password, function(err,user){
                if(err){
>>>>>>> 177f33ce4adfa41a7d0aeabfc72e53b266359d98
                    console.log(err)
                    return res.render("/login2")
                }
<<<<<<< HEAD
                passport.authenticate("local")(req, res, function () {
                    console.log(user.username);
                    res.redirect("/secret");

=======
                passport.authenticate("local")(req,res, function(){
                  console.log(user.username);
                    res.redirect("/userprofile");
                    
>>>>>>> 177f33ce4adfa41a7d0aeabfc72e53b266359d98
                })
            })
            //console.log(response.data);
            //console.log(response.data.explanation);
        })
        .catch(error => {
            console.log(error);
        });
})

<<<<<<< HEAD
app.get("/login2", function (req, res) {
    res.render("login2")
})

app.post("/login2", passport.authenticate("local", {
    successRedirect: "/secret",
=======
app.post("/login2",passport.authenticate("local",{
    successRedirect: "/userprofile",
>>>>>>> 177f33ce4adfa41a7d0aeabfc72e53b266359d98
    failureRedirect: "/login2"
}), function (req, res) {
})

//Friend
app.post("/addfriend", (req, res) => {
    console.log(req.body.f_handle)
    axios.get('https://codeforces.com/api/user.info?handles=' + req.body.handle)
        .then(response => {
            User.findById(req.params.id, function (err, found_user) {
                if (err) {
                    console.log("Error")
                    res.redirect("/");
                }
                else {
                    Friend.create(new Friend({ handle: req.body.f_handle }), function (err, friend) {
                        if (err) {
                            console.log(err)
                            return res.render("user")
                        }
                        else {
                            found_user.friends.push(friend);
                            found_user.save();
                            res.redirect("/userprofile");
                        }
                    });
                }
            });

        });

})

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})
app.get("/userprofile", function (req, res) {
    res.render("userprofile");
})

<<<<<<< HEAD
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
=======
app.get("/userprofile",(req,res)=>{
    res.render("userprofile");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
>>>>>>> 177f33ce4adfa41a7d0aeabfc72e53b266359d98
        return next()
    }
    res.redirect("/login2")
}

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

