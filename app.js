var bodyParser            = require("body-parser");
var mongoose              = require ("mongoose");
var express               = require("express");
var app                   = express();
var passport              =require("passport");
var LocalStrategy         =require("passport-local");
var User                 =require("./models/admin");
var passportLocalMongoose = require("passport-local-mongoose");
//mongoose

mongoose.connect("mongodb://localhost/portal");



//Server setup
app.set("view engine","ejs");

//express session

app.use(require("express-session")({
  secret: "Bharat mata ki jai ",
  resave: false,
  saveUninitialized : false
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Mongoose/Model /Config
var bankSchema = new mongoose.Schema({
  Name:        String,
  image:       String,
  description: String
});
var Bank = mongoose.model("Banks", bankSchema);
//=============================
//RESTFUL ROUTES
//=============================
app.get("/",function(req,res){
  res.render("home");
});
app.get("/banks",function(req,res){
  Bank.find({}, function(err,banks){
    if(err){
      console.log("ERROR");
    }else {
      res.render("index",{banks:banks});
    }
  });
});
app.get("/admin",isLoggedIn,function(req,res){
  res.render("admin");
});
// AUTH ROUTES
app.get("/adminregister",function(req,res){
  res.render("adminregister");
});
//handeling admin signup
app.post("/adminregister",function(req,res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}),req.body.password,function(err, user){
    if(err){
      console.log(err);
      return res.render("adminregister");
    }
    //strategy
    passport.authenticate("local")(req, res, function(){
      res.redirect("\admin");
    });
  });
});
//====Admin Login====
app.get("/adminlogin",function(req,res){
  res.render("adminlogin");
});
//Admin Login Logic
app.post("/login",passport.authenticate("local",{
  successRedirect: "/admin",
  failureRedirect: "/adminlogin"
}),function(req, res){
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/adminlogin");
});
//middleware (session checking login or not)
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/adminlogin");
}

//------------------------------------
app.listen(8080, function(){
  console.log("SERVER IS RUNNING");
});
