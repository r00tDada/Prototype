var mongoose = require("mongoose");
var freindSchema = new mongoose.Schema({
    platform: { type: String, default: "CodeForces" },
    handle: String
})

module.exports = mongoose.model("Friend", freindSchema);