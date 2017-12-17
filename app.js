var express            = require("express"),
 app                   = express(),
 bodyParser            = require("body-parser"),
 mongoose              = require("mongoose"),
 flash                 = require("connect-flash"),
 passport              = require("passport"),
 LocalStrategy         = require("passport-local"),
 methodOverride        = require("method-override"),
 expressSession        = require("express-session"),
 User                  = require("./models/user");

//requiring routs
 var commentRouts       = require("./routes/comments"),
 blogRouts              = require("./routes/blogs"),
 indexRouts             = require("./routes/index");

mongoose.Promise = global.Promise; // mpromise (mongoose's default promise library) is deprecated
mongoose.connect("mongodb://localhost/photos_blog",{ useMongoClient: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname+"/public"));// Add support for static files
app.use(methodOverride("_method")); //to DELETE,PUT req on forms
app.use(flash());

//PASSPORT CONFIG
app.use(expressSession({
    secret:"la la li",
    resave:false,
    saveUninitialized :false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//response locals
app.use(function(req,res,next){
    res.locals.currUser = req.user;
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
});
//ROUTS
app.use(indexRouts);
app.use("/blogs",blogRouts);
app.use("/blogs/:id/comments",commentRouts);

app.listen(3001,process.env.IP,function(){
    console.log("server has started at port 3001");
});
