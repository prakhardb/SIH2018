var bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    express        = require("express"),
    app            = express(),
    OUser          = require("./models/OUser"),
    branches       = require("./models/branch"),
    organisations   = require("./models/organisation");
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
  if(req.body.admincode === 'secretcode123'){
    newOUser.isAdmin= true;
  }
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
  successRedirect: "/orgDashboard",
  failureRedirect: "/OLogin"
}),function(req,res){ 
});
//==========================================///

//----------------- Admin-------------------
//==========================================/// 
app.get("/adminreg",function(req,res){
  res.render("adminreg");
});
app.get("/adminlogin",function(req,res){
  res.render("adminlogin");
});
app.get("/orgnew",function(req,res){
  res.render("orgnew");
});
//Admin Login
app.post("/adminlogin",passport.authenticate("local",
{
  successRedirect: "/admindash",
  failureRedirect: "/adminlogin"
}),function(req,res){ 
});
//Admin Dashboard
app.get("/admindash",function(req,res){
  res.render("admindash");
});
//Add Organisation
app.get("/admin/orgs",function(req,res){
 res.render("./admin/orgs");
});

app.post("/orgs",function(req,res){
  organisations.create(req.body.org,function(err,newOrganisation){
    if(err){
      res.render("orgnew");
    } else {
      res.redirect("admin/orgs");
    }
  }); 
});
//======================================////
//logout route
app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/");
});

// ROUTES
app.get("/",function(req,res){
  res.render("home");
});
app.get("/orgDashboard",function(req,res){
  res.render("dash");
});

// NEW BRANCH
app.get("/branch/new",isLoggedIn,function(req,res){
res.render("./OrgDash/branchnew");
});

app.get("/branches",function(req,res){
  res.render("branches");
});
app.post("/branches",function(req,res){
  branches.create(req.body.branch,function(err,newBranch){
    if(err){
      res.render("branch/new");
    } else {
      res.redirect("branches");
    }
  }); 
});

//MiddleWare
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("../OLogin");
}
//PORT
    app.listen(8080,function(){
      console.log("Server Is Running");  
    });