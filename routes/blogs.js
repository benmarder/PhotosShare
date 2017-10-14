var express            = require("express"),
    router             = express.Router(),
    Blog               = require("../models/blog"),
    middleware         = require("../middleware"); //requires index.js by defult

//INDEX -show all places
router.get("/",function(req,res){
    Blog.find({},function(err,posts){
        if(err){
            console.log(err);
        }else{
            res.render("blogs/index",{posts:posts});
        }
    });
});
//CREATE - add new place to db
router.post("/",middleware.isLoggedIn,function(req,res){
  var name =  req.body.name;
  var image =  req.body.image;
  var description = req.body.description;
  var author = {
      id:req.user._id,
      username:req.user.username
  }
  var newPost = {name: name, image:image ,description:description,author:author};
  Blog.create(newPost,function(err,newPost){
     if(err){
         console.log(err)
     } else{
          res.redirect("/blogs");
     }
  });
});
//NEW - show for, to create new place
router.get("/new",middleware.isLoggedIn,function(req,res){

    res.render("blogs/new");
});
//SHOW - show more info about place
router.get("/:id",function(req,res){
    Blog.findById(req.params.id)
              .populate("comments")
              .exec(function(err,post){
                    if(err){
                        console.log("awwwwwwwwwwwwwwwwwwwwwww");
                        console.log(err);
                    }else{
                         res.render("blogs/show",{post:post});
                    }
                });
});
//EDIT - show for, to create new place
router.get("/:id/edit",middleware.isOnershipMine,function(req,res){
    Blog.findById(req.params.id,function(err,post){
            res.render("blogs/edit",{post:post});
    });
});
//UPDATE - show more info about place
router.put("/:id",middleware.isOnershipMine,function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.post,function(err,post){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
             
});
//DESTROY
router.delete("/:id",middleware.isOnershipMine,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/");
        }
    });
    
});

module.exports = router;