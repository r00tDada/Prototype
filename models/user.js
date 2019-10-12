var mongoose= require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose")
var UserSchema=new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    FullName: String,
    collegeName: String,
    handle: String,
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Friend"
        }
    ]
})

UserSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model("User", UserSchema);