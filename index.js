var port = process.env.PORT || 8080;
var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    User                  = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/coding_app",{ useNewUrlParser: true })
app.use(require("express-session")({
    secret: "prototype",
    resave: false,
    saveUninitialized: false
}))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//==============
//Routes
//==============

app.get("/", function(req,res){
    res.render("landing");
})
app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
})

//Auth Routes

 app.post("/register",function(req,res){
      User.register(new User({username: req.body.username,FullName: req.body.FullName,email: req.body.email}), req.body.password, function(err,user){
          if(err){
              console.log(err)
              return res.render("/register")
          }
          passport.authenticate("local")(req,res, function(){
            console.log(user.username);
              res.redirect("/secret");
              
          })
      })
 });
 
app.get("/login",function(req,res){
     res.render("login")
})

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req,res){
})

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});