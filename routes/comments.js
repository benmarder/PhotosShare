var express            = require("express"),
    router             = express.Router({mergeParams:true}),
    Blog               = require("../models/blog"),
    Comment            = require("../models/comment"),
    middleware         = require("../middleware"); //requires index.js by defult


//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{post:post});
        }   
    });
    
});
//CREATE 
router.post("/",middleware.isLoggedIn,function(req,res){
    Blog.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                     req.flash("error","something went wrong");
                     res.redirect("back");
                }else{
                    //add username and id to comment
                    comment.author.id =  req.user._id;
                    comment.author.username =  req.user.username;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    req.flash("success","comment added!");
                    res.redirect("/blogs/"+post._id)
                }
            }); 
        }
    });
    
});
//EDIT
router.get("/:comment_id/edit",middleware.isCommentMine,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            req.flash("error","something went wrong");
            res.redirect("back");
        }else{
            res.render("comments/edit",{commentId:req.params.id,comment:comment});
        }
    });
});
//UPDATE
router.put("/:comment_id",middleware.isCommentMine,function(req,res){
  
    Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.textUpdated},function(err,comment2){
        if(err){
            req.flash("error","something went wrong");
            res.redirect("back");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
    
});
//DESTROY
router.delete("/:comment_id",middleware.isCommentMine,function(req,res){
      Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error","something went wrong");
            res.redirect("/blogs."+req.params.id);
        }
        else{
            req.flash("success","comment deleted!");
            res.redirect("/blogs/"+req.params.id);
        }
    });
});
module.exports = router;