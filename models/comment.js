//comment mongoose model
//--------------------------------------------
var mongoose = require("mongoose"),
    commentSchema = mongoose.Schema({
    text: String,
    author: 
        {   id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
        },
            username:String
        }
});

module.exports = mongoose.model("comment",commentSchema);