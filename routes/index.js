var express            = require("express"),
    router             = express.Router(),
    passport           = require("passport"),
    User               = require("../models/user"),
    middleware         = require("../middleware");

 
 //root rout  
router.get("/",function(req,res){
    res.render("landing");
});

//AUTH ROUTES
//===========

//show register form
router.get("/register",function(req,res){
    res.render("register");
});
//handle sign up
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if (err){
            req.flash("error",err.message);
            return res.redirect("back");
        }
        passport.authenticate("local")(req,res,function(){
           req.flash("success","wellcome , "+user.username);
           res.redirect("/blogs"); 
        });
    });
});
//show login form
router.get("/login",middleware.isTryingToLogAgain,function(req,res){
        res.render("login");
}); 

//handle login
router.post('/login', function(req, res){
  passport.authenticate('local', function(err, user, info) {
    if (! user || err) {
        req.flash("error","error logging in");
        return res.redirect("/login")
    }
     req.login(user, loginErr => {
       if (loginErr) {
         req.flash("error","something went wrong!");
         return res.redirect("/login")
       }
      req.flash("success","hello "+user.username+", you are now logged in");
      return res.redirect("/blogs")
    });      
  })(req, res);
});
//logout rout   
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/blogs");
}); 

module.exports=router;