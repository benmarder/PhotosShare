//post mongoose model
//--------------------------------------------
var mongoose = require("mongoose");

//mongoose schema setup:
var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    time : { type : Date, default: Date.now },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
}); 
module.exports = mongoose.model("blog",blogSchema);