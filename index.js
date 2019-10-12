var port = process.env.PORT || 8080;
var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    User                  = require("./models/user"),
    passportLocalMongoose = require("passport-local-mongoose"),
    request=require("request");
    const axios = require('axios');

// mongoose.connect("mongodb://localhost/coding_app",{ useNewUrlParser: true })
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
    res.render("userprofile");
})
app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
})

//Auth Routes

//  app.post("/register",function(req,res){
//      console.log("https://codeforces.com/api/user.info?handles="+ req.body.handle);
//      request({
//          url: "https://codeforces.com/api/user.info?handles="+ req.body.handle,
//          json: true
//      },function(error,response,body){
//          if(!error || response.statusCode===200){
//              if(body.status != "OK"){
//                  console.log("Undefined Username");
//                  res.redirect("back");
//              }else{
//                 User.register(new User({username: req.body.username,FullName: req.body.FullName,email: req.body.email}), req.body.password, function(err,user){
//                     if(err){
//                         console.log(err)
//                         return res.render("/register")
//                     }
//                     passport.authenticate("local")(req,res, function(){
//                       console.log(user.username);
//                         res.redirect("/secret");
                        
//                     })
//                 })
//              }
//          }else{
//              console.log("Undefiername");
//              console.log(error);
//              res.redirect("back");

//          }
//      })
      
//  });

 app.post("/register",(req,res)=>{
    console.log(req.body.handle);
    axios.get('https://codeforces.com/api/user.info?handles=eclipse_hunter')
      .then(response => {
          console.log(response.data);
            User.register(new User({username: req.body.username,FullName: req.body.FullName,email: req.body.email,collegeName: req.body.collegeName,handle: req.body.handle}), req.body.password, function(err,user){
                if(err){
                    console.log(err)
                    return res.render("/login")
                }
                passport.authenticate("local")(req,res, function(){
                  console.log(user.username);
                    res.redirect("/secret");
                    
                })
            })
        //console.log(response.data);
        //console.log(response.data.explanation);
      })
      .catch(error => {
        console.log(error);
      });
 })
 
app.get("/login2",function(req,res){
     res.render("login2")
})

app.post("/login2",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login2"
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
    res.redirect("/userprofile")
}

app.listen(5090, function () {
    console.log("Running RestHub on port " + 5090);
});