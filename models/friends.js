var mongoose=require("mongoose");
var freindSchema=new mongoose.Schema({
    handle: String
})

module.exports=mongoose.model("Friend",freindSchema);