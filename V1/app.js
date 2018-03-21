var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    express    = require("express"),
    app        = express(),
    OUser       = require("./models/OUser");

//SERVER PROPERTIES
    mongoose.connect("mongodb://localhost/portal");
    app.set('view engine','ejs');
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "romeo loves juliet",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(OUser.authenticate()));
passport.serializeUser(OUser.serializeUser());
passport.deserializeUser(OUser.deserializeUser());
app.use(function(req,res, next){
  res.locals.currentUser = req.user;
  next();
});
// =============
// AUTH ROUTES
// =============
// SHOW SIGNUP FORM
app.get("/OSignup",function(req,res){
  res.render("OSignup");
});

//handel signup logic
app.post("/OSignup",function(req,res){
  var newOUser = new OUser({
    OrganisationName: req.body.Organisation,
    TypeOfOrganisation: req.body.typeoforg,
    username: req.body.username,
    email:    req.body.email
  });
     OUser.register(newOUser,req.body.password, function(err,OUser){
       if(err){
         console.log(err);
         return res.render("OSignup")
       }
       passport.authenticate("local")(req,res,function(){
        res.redirect("/");
       });
     });
});
// SHOW LOGIN FORM
app.get("/OLogin",function(req,res){
  res.render("OLogin");
});
// handeling Ologin Logic
app.post("/OLogin",passport.authenticate("local",
{
  successRedirect: "/",
  failureRedirect: "/OLogin"
}),function(req,res){ 
});
//logout route
app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");
});

// ROUTES
app.get("/",function(req,res){
  res.render("home");
});

//PORT
    app.listen(8080,function(){
      console.log("Server Is Running");  
    });