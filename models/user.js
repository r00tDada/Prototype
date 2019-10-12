var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    FullName: String,
    collegeName: String,
    handle: String,
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Friend"
        }
    ],
    Problems: {
        Accepted: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Data
        }],
        Wrong: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Data
        }]
    }
})

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", UserSchema);