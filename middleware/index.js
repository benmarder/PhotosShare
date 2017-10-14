// app middlewares
//---------------------------------------------------
var Blog        = require("../models/blog"),
    Comment     = require("../models/comment");

var middlewarePbj = {};

//function that checks if a user isAuthenticated
middlewarePbj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in to do that");
    res.redirect("/login");
}
//function that prevents a logged in user to try and log in again
middlewarePbj.isTryingToLogAgain = function(req,res,next){
    if(req.isAuthenticated()){
        req.flash("error","you are logged in already, log out first");
        return res.redirect("/blogs");
    }
    next();
}

//function that check ownership on a comment : 
middlewarePbj.isCommentMine = function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                req.flash("error","comment no found");
                res.redirect("back");
            }else{
                // does user own the comment?
                if(comment.author.id.equals(req.user._id)){
                     return next();
                }
                req.flash("error","you dont have permission to do that");
                res.redirect("back");
            }
        });
    }else{
            req.flash("error","you need to be logged in to do that");
            res.redirect("back");
    }
}
//function that check ownership on a post : 
middlewarePbj.isOnershipMine = function(req,res,next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id,function(err,post){
            if(err){
                req.flash("error","comment no found");
                res.redirect("back");
            }else{
                // does user own the post?
                if(post.author.id.equals(req.user._id)){
                     return next();
                }
                req.flash("error","you dont have permission to do that");
                res.redirect("back");
            }
        });
    }else{
             req.flash("error","you need to be logged in to do that");
             res.redirect("back");
    }
}

module.exports = middlewarePbj