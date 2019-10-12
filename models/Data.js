var mongoose = require("mongoose");
var DataSchema = new mongoose.Schema({
    ProblemId: String,
    ProblemName: String,
    Tags: String
});
module.exports = mongoose.model("DataSchema", DataSchema);
